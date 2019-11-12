import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constituency } from './const.entity';
import { Repository } from 'typeorm';
import { AddConst } from './const.dto';

@Injectable()
export class ConstService {
  constructor(
    @InjectRepository(Constituency)
    private readonly stateRepository: Repository<Constituency>,
  ) {}

  findAll(): Promise<Constituency[]> {
    return this.stateRepository.find();
  }

  async create(body: AddConst): Promise<Constituency> {
    const constituency = new Constituency();
    constituency.name = body.name;
    constituency.stateId = body.stateId;
    try {
      return await this.stateRepository.save(constituency);
    } catch (error) {
      if (error.message && error.message.includes('duplicate')) {
        throw new ConflictException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}
