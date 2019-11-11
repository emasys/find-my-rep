import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from './state.entity';
import { Repository } from 'typeorm';
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

  async create(body: AddState): Promise<State> {
    const state = new State();
    state.name = body.name;
    state.shortCode = body.shortCode;
    state.addedById = body.userId;
    try {
      const response = await this.stateRepository.save(state);
      return response;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
