import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { Rep } from '../src/reps/reps.entity';
import { State } from '../src/state/state.entity';
import { Constituency } from '../src/constituency/const.entity';
import { Users } from '../src/user/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../src/auth/constants';
import { UsersModule } from '../src/user/user.module';
import { AuthService } from '../src/auth/auth.service';
import { LocalStrategy } from '../src/auth/local.strategy';
import { JwtStrategy } from '../src/auth/jwt.strategy';
import { AuthController } from '../src/auth/auth.controller';
import { RepsModule } from '../src/reps/reps.module';
import { StateModule } from '../src/state/state.module';
import { ConstModule } from '../src/constituency/const.module';
import { AuthModule } from '../src/auth/auth.module';
import { generateDummyData } from './testUtil';

describe('RepsController (e2e)', () => {
  let app;
  let token;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          entities: [Rep, State, Constituency, Users],
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1d' },
        }),
        RepsModule,
        StateModule,
        ConstModule,
        AuthModule,
        UsersModule,
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy],
      exports: [AuthService],
      controllers: [AuthController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should generate dummy data', async () => {
    token = await generateDummyData(app);
    expect(token).toBeDefined();
  });

  it('/rep (POST) reject unauthorized request', () => {
    return request(app.getHttpServer())
      .post('/rep')
      .send({ constituency: 'some area' })
      .expect(401)
      .expect(res => {
        expect(res.body).toEqual({ statusCode: 401, error: 'Unauthorized' });
      });
  });

  it('/rep (POST) reject incomplete data', () => {
    return request(app.getHttpServer())
      .post('/rep')
      .set('Authorization', `Bearer ${token}`)
      .send({ names: 'some guy' })
      .expect(400)
      .expect(res => {
        expect(res.body).toHaveProperty('error');
      });
  });

  it('/rep (POST) valid', () => {
    return request(app.getHttpServer())
      .post('/rep')
      .set('Authorization', `Bearer ${token}`)
      .send({
        names: 'some guy',
        constituencyId: 1,
        yearsInOffice: 1,
        previousOffice: 'SecGen',
      })
      .expect(201);
  });

  it('/rep/id/update (PUT) valid', () => {
    return request(app.getHttpServer())
      .put('/rep/2/update')
      .set('Authorization', `Bearer ${token}`)
      .send({
        names: 'random guy',
        yearsInOffice: 10,
        previousOffice: 'SecGen',
      })
      .expect(200);
  });

  it('/rep/id/ (DELETE) valid', () => {
    return request(app.getHttpServer())
      .put('/rep/2/update')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('/rep (GET) fetch all reps', () => {
    return request(app.getHttpServer())
      .get('/rep')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  afterAll(async () => {
    await getConnection().synchronize(true);
    await app.close();
  });
});
