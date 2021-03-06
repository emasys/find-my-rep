import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rep } from './reps.entity';
import { Repository, DeleteResult, Like } from 'typeorm';
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

  async create(body: CreateRep): Promise<Rep> {
    const rep = new Rep();
    rep.names = body.names;
    rep.constituencyId = body.constituencyId;
    rep.previousOffice = body.previousOffice;
    rep.yearsInOffice = body.yearsInOffice;
    rep.phone = body.phone;
    rep.email = body.email;
    try {
      return await this.repsRepository.save(rep);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<Rep> {
    try {
      const rep = await this.repsRepository.findOne(id);
      if (!rep) {
        throw new NotFoundException();
      }
      return rep;
    } catch (error) {
      if (error.message.statusCode === 404) {
        return error.message;
      }
      throw new BadRequestException();
    }
  }

  async findAllRepsInOneConstituency(constituencyId: number): Promise<Rep[]> {
    const reps = await this.repsRepository.find({ where: { constituencyId } });
    return reps;
  }

  async searchRep(name: string): Promise<Rep[]> {
    try {
      const rep = await this.repsRepository
        .createQueryBuilder('rep')
        .leftJoinAndSelect('rep.constituency', 'constituency')
        .where({ names: Like(`%${name.toLowerCase()}%`) })
        .getMany();
      return rep;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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
}
