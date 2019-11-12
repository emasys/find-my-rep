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

describe('StateController (e2e)', () => {
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

  it('create dummy user (POST) valid', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .set('Accept', 'application/json')
      .send({ username: 'emasys', password: 'password' })
      .expect(201)
      .expect(res => {
        token = res.body.access_token;
        expect(res.body).toHaveProperty('access_token');
      });
  });

  it('/state (POST) reject unauthorized request', () => {
    return request(app.getHttpServer())
      .post('/state')
      .send({ name: 'some state' })
      .expect(401)
      .expect(res => {
        expect(res.body).toEqual({ statusCode: 401, error: 'Unauthorized' });
      });
  });

  it('/state (POST) reject incomplete data', () => {
    return request(app.getHttpServer())
      .post('/state')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'some state' })
      .expect(400)
      .expect(res => {
        expect(res.body).toHaveProperty('error');
      });
  });

  it('/state (POST) valid', () => {
    return request(app.getHttpServer())
      .post('/state')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'some state', shortCode: 'SS' })
      .expect(201)
      .expect(res => {
        expect(res.body).toHaveProperty('addedById');
      });
  });

  it('/state (POST) reject duplicate', () => {
    return request(app.getHttpServer())
      .post('/state')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'some state', shortCode: 'SS' })
      .expect(409)
      .expect(res => {
        expect(res.body).toHaveProperty('error');
      });
  });

  it('/state (GET) valid', () => {
    return request(app.getHttpServer())
      .get('/state')
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
