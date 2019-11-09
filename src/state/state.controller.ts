import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { StateService } from './state.service';
import { State } from './state.entity';
import { AddState } from './state.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  fetchStates(): Promise<State[]> {
    return this.stateService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  addStates(@Body() body: AddState, @Request() req): Promise<State> {
    const { userId } = req.user;
    body.userId = userId;
    return this.stateService.create(body);
  }
}
