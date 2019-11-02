import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rep } from './reps.entity';
import { Repository, DeleteResult } from 'typeorm';
import { CreateRep } from './reps.dto';

@Injectable()
export class RepsService {
  constructor(
    @InjectRepository(Rep)
    private readonly repsRepository: Repository<Rep>,
  ) {}

  findAll(): Promise<Rep[]> {
    return this.repsRepository.find();
  }

  create(body: CreateRep): Promise<Rep> {
    const rep = new Rep();
    rep.names = body.names;
    rep.constituencyId = body.constituencyId;
    rep.previousOffice = body.previousOffice;
    rep.yearsInOffice = body.yearsInOffice;
    return this.repsRepository.save(rep);
  }

  async updateRep(body: CreateRep, id: number): Promise<Rep> {
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
