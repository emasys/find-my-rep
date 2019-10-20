import { Controller, Get, Param } from '@nestjs/common';
import { RepsService } from './reps.service';

@Controller('reps')
export class RepsController {
  constructor(private readonly appService: RepsService) {}

  @Get()
  fetchAllReps(): string {
    return this.appService.getAllReps();
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
