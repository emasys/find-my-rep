import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { State } from './state/state.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Reps } from './reps/reps.entity';
import { RepsModule } from './reps/reps.module';
import { StateModule } from './state/state.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    entities: [Reps, State],
  }), RepsModule, StateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
