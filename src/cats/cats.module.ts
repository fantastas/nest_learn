import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from 'src/schemas/cat.schema';
import { CatInterface } from 'src/cats/interfaces/cat.interface';

const CatsFeature = MongooseModule.forFeature([
  {
    name: Cat.name,
    schema: CatSchema,
  },
]);
@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],

  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService, CatsFeature], // to make it usable by other modules
})
export class CatsModule {}
