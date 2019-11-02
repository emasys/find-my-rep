import { Injectable } from '@nestjs/common';
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

  create(body: AddConst): Promise<Constituency> {
    const constituency = new Constituency();
    constituency.name = body.name;
    constituency.stateId = body.stateId;
    return this.stateRepository.save(constituency);
  }
}
