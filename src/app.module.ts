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

import { typeOrmConfig } from './shared/config/typeorm.config';
import { Repository } from 'typeorm';
import { User } from './core/user/user.entity';
import { UserRole } from './core/user/user.role';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User]),
    CoreModule,
    FeatureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}
  async onModuleInit() {
    const userType = UserRole.SYSTEM;
    let system = await this.userRepo
      .createQueryBuilder('user').select()
      .where('user.role =:userType', { userType })
      .getOne();

    if (!system || !Object.keys(system).length) {
      system = new User(`VEHICLE BOOKING`, `SYSTEM`, `0790101888`, null);

      try {
        return await this.userRepo.save(system);
      } catch (error) {
        if (error.errno === 1062) {
          throw new ConflictException('user already exists');
        } else {
          throw new InternalServerErrorException(error.message);
        }
      }
    }
  }
}
