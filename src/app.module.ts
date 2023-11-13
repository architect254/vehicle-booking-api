import {
  ConflictException,
  InternalServerErrorException,
  Module,
  OnModuleInit,
} from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CoreModule } from './core/core.module';
import { FeatureModule } from './feature/feature.module';

import { typeOrmConfig } from './shared/typeorm.config';
import { User } from './core/user/user.entity';
import { UserRole } from './core/user/user.role';
import { UserService } from './core/user/user.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forRoot(typeOrmConfig),
    CoreModule,
    FeatureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private userService: UserService,
  ) {}
  async onModuleInit() {
    this.userService.checkSystem()
  }
}
