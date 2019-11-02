import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepsService } from './reps.service';
import { RepsController } from './reps.controller';
import { Reps } from './reps.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reps])],
  providers: [RepsService],
  controllers: [RepsController],
})
export class RepsModule { }
