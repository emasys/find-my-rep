import { Controller, Get, Post, Body } from '@nestjs/common';
import { ConstService } from './const.service';
import { Constituency } from './const.entity';
import { AddConst } from './const.dto';

@Controller('constituency')
export class ConstController {
  constructor(private readonly service: ConstService) {}

  @Get()
  fetchStates(): Promise<Constituency[]> {
    return this.service.findAll();
  }

  @Post()
  addStates(@Body() body: AddConst): Promise<Constituency> {
    return this.service.create(body);
  }
}
