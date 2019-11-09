import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ConstService } from './const.service';
import { Constituency } from './const.entity';
import { AddConst } from './const.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('constituency')
export class ConstController {
  constructor(private readonly service: ConstService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  fetchStates(): Promise<Constituency[]> {
    return this.service.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  addStates(@Body() body: AddConst): Promise<Constituency> {
    return this.service.create(body);
  }
}
