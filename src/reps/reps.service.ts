import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reps } from './reps.entity';
import { Repository, DeleteResult } from 'typeorm';
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

  async updateRep(body: CreateRep, id: number): Promise<Reps> {
    const rep = await this.repsRepository.findOne(id);
    rep.name = body.name || rep.name;
    rep.region = body.region || rep.region;
    const updatedRep = await this.repsRepository.save(rep);
    return updatedRep;
  }

  async deleteRep(id: number): Promise<DeleteResult> {
    const res = await this.repsRepository.delete(id);
    return res;
  }

  async getRepsFromOneRegion(region: string): Promise<Reps[]> {
    const reps = await this.repsRepository.find({ region });
    return reps;
  }

  async getOneRep(id: number, region: string): Promise<Reps> {
    const reps = await this.repsRepository.findOne({ region, id });
    return reps;
  }
}
