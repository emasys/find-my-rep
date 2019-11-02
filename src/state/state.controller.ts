import { Controller, Get, Post, Body } from '@nestjs/common';
import { StateService } from './state.service';
import { State } from './state.entity';
import { AddState } from './state.dto';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  fetchStates(): Promise<State[]> {
    return this.stateService.findAll();
  }

  @Post()
  addStates(@Body() body: AddState): Promise<State> {
    return this.stateService.create(body);
  }
}
