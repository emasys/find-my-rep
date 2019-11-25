import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constituency } from './const.entity';
import { Repository, Like } from 'typeorm';
import { AddConst } from './const.dto';

@Injectable()
export class ConstService {
  constructor(
    @InjectRepository(Constituency)
    private readonly repository: Repository<Constituency>,
  ) {}

  findAll(): Promise<Constituency[]> {
    return this.repository.find();
  }

  async searchConstituency(name: string): Promise<Constituency[]> {
    try {
      const constituency = await this.repository
        .createQueryBuilder('constituency')
        .leftJoinAndSelect('constituency.state', 'state')
        .where({ name: Like(`%${name.toLowerCase()}%`) })
        .getMany();
      return constituency;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async create(body: AddConst): Promise<Constituency> {
    const constituency = new Constituency();
    constituency.name = body.name;
    constituency.stateId = body.stateId;
    try {
      return await this.repository.save(constituency);
    } catch (error) {
      if (error.message && error.message.includes('duplicate')) {
        throw new ConflictException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}
