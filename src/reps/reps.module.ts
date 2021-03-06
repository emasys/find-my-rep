import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepsService } from './reps.service';
import { RepsController } from './reps.controller';
import { Rep } from './reps.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rep])],
  providers: [RepsService],
  exports: [RepsService],
  controllers: [RepsController],
})
export class RepsModule { }
