import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { State } from './state/state.entity';
import { StateModule } from './state/state.module';

import { Rep } from './reps/reps.entity';
import { RepsModule } from './reps/reps.module';

import { Constituency } from './constituency/const.entity';
import { ConstModule } from './constituency/const.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: [Rep, State, Constituency],
    }),
    RepsModule,
    StateModule,
    ConstModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
