import { CatsService } from './cats.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Redirect,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private CatsService: CatsService) {}
  @Get()
  async findAll(): Promise<Cat[]> {
    return this.CatsService.findAll();
  }

  @Get('ab*cd')
  async find() {
    return 'This route uses a wildcard';
  }

  @Get(':id')
  async findOne(@Param() params): Promise<string> {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.CatsService.create(createCatDto);
  }
}
