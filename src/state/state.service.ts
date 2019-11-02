import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from './state.entity';
import { Repository, DeleteResult } from 'typeorm';
import { AddState } from './state.dto';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
  ) {}

  findAll(): Promise<State[]> {
    return this.stateRepository.find();
  }

  create(body: AddState): Promise<State> {
    const state = new State();
    state.name = body.name;
    state.shortCode = body.shortCode;
    return this.stateRepository.save(state);
  }

  // async updateRep(body: CreateRep, id: number): Promise<State> {
  //   const rep = await this.stateRepository.findOne(id);
  //   rep.name = body.name || rep.name;
  //   rep.region = body.region || rep.region;
  //   const updatedRep = await this.stateRepository.save(rep);
  //   return updatedRep;
  // }

  // async deleteRep(id: number): Promise<DeleteResult> {
  //   const res = await this.stateRepository.delete(id);
  //   return res;
  // }

  // async getStateFromOneRegion(region: string): Promise<State[]> {
  //   const State = await this.stateRepository.find({ region });
  //   return State;
  // }

  // async getOneRep(id: number, region: string): Promise<State> {
  //   const State = await this.stateRepository.findOne({ region, id });
  //   return State;
  // }
}
