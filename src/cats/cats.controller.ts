import { CatsService } from './cats.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Redirect,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
// import { Cat } from 'src/cats/interfaces/cat.interface';
import { JoiValidationPipe } from 'src/pipes/joi-validation-pipe';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('cats')
export class CatsController {
  constructor(private CatsService: CatsService) {}
  // @Get()
  // async findAll(): Promise<Cat[]> {
  //   return this.CatsService.findAll();
  // }

  // @Get('ab*cd')
  // async find() {
  //   return 'This route uses a wildcard';
  // }

  // @Get(':id')
  // async findOne(@Param() params): Promise<string> {
  //   console.log(params.id);
  //   return `This action returns a #${params.id} cat`;
  // }
  @Post()
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    this.CatsService.create(createCatDto);
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  @Get('exeption')
  async findOne() {
    // The response argument defines the JSON response body.
    // It can be a string or an object as described below.
    // The status argument defines the HTTP status code.
    throw new HttpException(
      {
        status: 'Forbidden',
        error: 'Custom error message',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
function UsePipes(arg0: any) {
  throw new Error('Function not implemented.');
}
