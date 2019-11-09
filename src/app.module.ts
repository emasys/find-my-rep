import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { State } from './state/state.entity';
import { StateModule } from './state/state.module';

import { Rep } from './reps/reps.entity';
import { RepsModule } from './reps/reps.module';

import { Constituency } from './constituency/const.entity';
import { ConstModule } from './constituency/const.module';
// import { UserService } from './auth/user/user.service';
// import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: [Rep, State, Constituency],
    }),
    RepsModule,
    StateModule,
    ConstModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
