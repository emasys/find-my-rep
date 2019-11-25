import { Injectable } from '@nestjs/common';
import { ConstService } from '../constituency/const.service';
import { RepsService } from '../reps/reps.service';
import { StateService } from '../state/state.service';
import { Rep } from '../reps/reps.entity';
import { Constituency } from '../constituency/const.entity';
import { State } from '../state/state.entity';

@Injectable()
export class SearchService {
  constructor(
    private readonly constService: ConstService,
    private readonly repService: RepsService,
    private readonly stateService: StateService,
  ) {}

  async findRep(name: string): Promise<Rep[]> {
    return this.repService.searchRep(name);
  }

  async findConstituency(name: string): Promise<Constituency[]> {
    return this.constService.searchConstituency(name);
  }

  async findState(name: string): Promise<State[]> {
    return this.stateService.searchState(name);
  }

  async searchDB(name: string, state: string, constituency: string) {
    const rep = await this.findRep(name);
    const area = await this.findConstituency(constituency);
    const region = await this.findState(state);
    const result = { rep, constituency: area, state: region };
    return result;
  }
}
