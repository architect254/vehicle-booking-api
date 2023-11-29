import {
  Module,
} from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CoreModule } from './core/core.module';
import { typeOrmConfig } from './shared/typeorm.config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forRoot(typeOrmConfig),
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
