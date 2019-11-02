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
import { Rep } from './reps.entity';
import { CreateRep, RepParam } from './reps.dto';
import { DeleteResult } from 'typeorm';
import { Request } from 'express';

@Controller('rep')
export class RepsController {
  constructor(private readonly repService: RepsService) {}

  @Get()
  fetchAllReps(): Promise<Rep[]> {
    return this.repService.findAll();
  }

  @Post('add')
  addRep(@Body() createRep: CreateRep): Promise<Rep> {
    return this.repService.create(createRep);
  }

  @Put(':id/update')
  updateOneRep(
    @Body() updateRep: CreateRep,
    @Param() params: RepParam,
  ): Promise<Rep> {
    const { id } = params;
    return this.repService.updateRep(updateRep, id);
  }

  @Delete(':id/delete')
  async deleteOneRep(
    @Param() params: RepParam,
  ): Promise<{ message: string, status: string}> {
    const { id } = params;
    const response = await this.repService.deleteRep(id);
    if (response.affected) {
      return { message: 'rep successfully deleted', status: 'success' };
    }
    return { message: 'rep not found', status: 'error' };
  }
}
