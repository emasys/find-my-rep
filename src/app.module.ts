import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepsController } from './reps/reps.controller';
import { RepsService } from './reps/reps.service';

@Module({
  imports: [],
  controllers: [AppController, RepsController],
  providers: [AppService, RepsService],
})
export class AppModule {}
