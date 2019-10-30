import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { RepsService } from './reps.service';
import { Reps } from './reps.entity';
import { CreateRep } from './reps.dto';

@Controller('reps')
export class RepsController {
  constructor(private readonly appService: RepsService) {}

  @Get()
  fetchAllReps(): Promise<Reps[]> {
    return this.appService.findAll();
  }

  @Post('add')
  addRep(@Body() createRep: CreateRep): Promise<Reps> {
    return this.appService.create(createRep);
  }

  @Get(':region')
  fetchRepsFromOneRegion(@Param() params: { region: string }): string {
    return this.appService.getRepsFromOneRegion(params.region);
  }

  @Get(':region/:id')
  fetchOneRep(@Param() params: { region: string; id: number }): string {
    const { region, id } = params;
    return this.appService.getOneRep(id, region);
  }
}
