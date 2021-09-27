import { GoogleStrategy } from './google/google.strategy';
import { LoggerMiddleware } from './middleware/logger-middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GoogleController } from './google/google.controller';
import { GoogleService } from './google/google.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CatsModule,
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(process.env.database),
  ],
  controllers: [AppController, CatsController, GoogleController],
  providers: [AppService, CatsService, GoogleService, GoogleStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // adding middleware
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
