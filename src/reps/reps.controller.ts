import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Req,
} from '@nestjs/common';
import { RepsService } from './reps.service';
import { Reps } from './reps.entity';
import { CreateRep } from './reps.dto';
import { DeleteResult } from 'typeorm';
import { Request } from 'express';

@Controller('reps')
export class RepsController {
  constructor(private readonly repService: RepsService) {}

  @Get()
  fetchAllReps(): Promise<Reps[]> {
    return this.repService.findAll();
  }

  @Get(':region')
  fetchRepsFromOneRegion(@Param() params: { region: string }): Promise<Reps[]> {
    return this.repService.getRepsFromOneRegion(params.region);
  }

  @Get(':region/:id')
  fetchOneRep(@Param() params: { region: string; id: number }): Promise<Reps> {
    const { region, id } = params;
    return this.repService.getOneRep(id, region);
  }

  @Post('add')
  addRep(@Body() createRep: CreateRep): Promise<Reps> {
    return this.repService.create(createRep);
  }

  @Put(':id/update')
  updateOneRep(
    @Body() updateRep: CreateRep,
    @Param() params: { id: number },
  ): Promise<Reps> {
    const { id } = params;
    return this.repService.updateRep(updateRep, id);
  }

  @Delete(':id/delete')
  async deleteOneRep(
    @Param() params: { id: number },
    @Req() request: Request,
  ): Promise<{ message: string, status: string}> {
    const { id } = params;
    const response = await this.repService.deleteRep(id);
    if (response.affected) {
      return { message: 'rep successfully deleted', status: 'success' };
    }
    return { message: 'rep not found', status: 'error' };
  }
}
