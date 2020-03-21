import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [
    DatabaseModule,
    UserModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*')
  }
}
