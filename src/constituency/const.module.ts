import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstService } from './const.service';
import { ConstController } from './const.controller';
import { Constituency } from './const.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Constituency])],
  providers: [ConstService],
  controllers: [ConstController],
})
export class ConstModule {}
