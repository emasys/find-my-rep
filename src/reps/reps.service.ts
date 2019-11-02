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

  create(body: CreateRep): Promise<Reps> {
    const rep = new Reps();
    rep.names = body.names;
    rep.constituencyId = body.constituencyId;
    rep.previousOffice = body.previousOffice;
    rep.yearsInOffice = body.yearsInOffice;
    return this.repsRepository.save(rep);
  }

  async updateRep(body: CreateRep, id: number): Promise<Reps> {
    const rep = await this.repsRepository.findOne(id);
    rep.names = body.names || rep.names;
    rep.previousOffice = body.previousOffice || rep.previousOffice;
    rep.yearsInOffice = body.yearsInOffice || rep.yearsInOffice;
    return this.repsRepository.save(rep);
  }

  async deleteRep(id: number): Promise<DeleteResult> {
    const res = await this.repsRepository.delete(id);
    return res;
  }

  // async getRepsFromOneRegion(region: string): Promise<Reps[]> {
  //   const reps = await this.repsRepository.find({ region });
  //   return reps;
  // }

  // async getOneRep(id: number, region: string): Promise<Reps> {
  //   const reps = await this.repsRepository.findOne({ region, id });
  //   return reps;
  // }
}
