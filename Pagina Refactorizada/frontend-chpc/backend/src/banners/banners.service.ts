import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banner } from './banner.entity';

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(Banner)
    private bannersRepository: Repository<Banner>,
  ) {}

  findAll(): Promise<Banner[]> {
    return this.bannersRepository.find();
  }
}
