import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { RepsModule } from '../reps/reps.module';
import { StateModule } from '../state/state.module';
import { ConstModule } from '../constituency/const.module';
import { StateService } from '../state/state.service';
import { RepsService } from '../reps/reps.service';
import { ConstService } from '../constituency/const.service';

@Module({
  imports: [RepsModule, ConstModule, StateModule],
  // providers: [SearchService, ConstService, RepsService, StateService],
  // controllers: [SearchController],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
