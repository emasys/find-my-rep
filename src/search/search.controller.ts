import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SearchQuery } from './search.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly service: SearchService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async search(@Query() query: SearchQuery): Promise<any> {
    const { name, state, constituency } = query;
    return this.service.searchDB(name, state, constituency);
  }
}
