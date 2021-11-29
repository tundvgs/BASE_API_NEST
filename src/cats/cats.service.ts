import { Inject, Injectable } from '@nestjs/common';
import { Cat } from './cat.entity';
import { BaseService } from '../base/service/base.service';

@Injectable()
export class CatsService extends BaseService {
  constructor(
    @Inject('CATS_REPOSITORY')
    private catsRepository: typeof Cat,
  ) {
    super(catsRepository);
  }

  async findAll(): Promise<Cat[]> {
    return await this.catsRepository.findAll<Cat>();
  }
}
