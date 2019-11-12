import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RepsService } from './reps.service';
import { Rep } from './reps.entity';
import { CreateRep, RepParam } from './reps.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('rep')
export class RepsController {
  constructor(private readonly repService: RepsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  fetchAllReps(): Promise<Rep[]> {
    return this.repService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  addRep(@Body() createRep: CreateRep): Promise<Rep> {
    return this.repService.create(createRep);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id/update')
  updateOneRep(
    @Body() updateRep: CreateRep,
    @Param() params: RepParam,
  ): Promise<Rep> {
    const { id } = params;
    return this.repService.updateRep(updateRep, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id/delete')
  async deleteOneRep(
    @Param() params: RepParam,
  ): Promise<{ message: string; status: string }> {
    const { id } = params;
    const response = await this.repService.deleteRep(id);
    if (response.affected) {
      return { message: 'rep successfully deleted', status: 'success' };
    }
    return { message: 'rep not found', status: 'error' };
  }
}
