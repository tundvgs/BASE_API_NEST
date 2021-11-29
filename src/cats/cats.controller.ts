import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateCatDto, ListAllEntities, UpdateCatDto } from './dto/index.dto';
import { CatsService } from './cats.service';
import { NotfoundException } from '../exception/notfound.exception';

@Controller('cats')
export class CatsController {
  constructor(private readonly service: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  async findAll(@Query() query: ListAllEntities) {
    return await this.service.Pagination({
      limit: 1,
      page: 0,
      where: {},
      order: [{ id: 'ASC' }],
    });
  }

  /**
   *
   * @param id
   */
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.service.GetById(id);
    if (data) {
      return data;
    }
    throw new NotfoundException();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
