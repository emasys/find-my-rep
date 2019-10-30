import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reps } from './reps.entity';
import { Repository } from 'typeorm';
import { CreateRep } from './reps.dto';

@Injectable()
export class RepsService {
  constructor(
    @InjectRepository(Reps)
    private readonly repsRepository: Repository<Reps>,
  ) {}

  findAll(): Promise<Reps[]> {
    return this.repsRepository.find();
  }

  async create(body: CreateRep): Promise<Reps> {
    const rep = new Reps();
    rep.name = body.name;
    rep.region = body.region;
    const newRep = await this.repsRepository.save(rep);
    return newRep;
  }

  getAllReps(): string {
    return 'you are now viewing all government representatives from all region';
  }

  getRepsFromOneRegion(region: string): string {
    return `you are now viewing all government representatives from ${region}`;
  }

  getOneRep(id: number, region: string): string {
    return `you are now viewing one government representative from ${region},  id - ${id}`;
  }
}
