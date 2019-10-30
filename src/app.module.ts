import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepsController } from './repository/reps/reps.controller';
import { RepsService } from './repository/reps/reps.service';
import { Reps } from './repository/reps/reps.entity';
import { RepsModule } from './repository/reps/reps.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    entities: [Reps],
  }), RepsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
