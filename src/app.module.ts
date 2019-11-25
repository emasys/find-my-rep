import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { State } from './state/state.entity';
import { StateModule } from './state/state.module';

import { Rep } from './reps/reps.entity';
import { RepsModule } from './reps/reps.module';

import { Constituency } from './constituency/const.entity';
import { ConstModule } from './constituency/const.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { Users } from './user/user.entity';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: [Rep, State, Constituency, Users],
    }),
    RepsModule,
    StateModule,
    ConstModule,
    AuthModule,
    UsersModule,
    SearchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
