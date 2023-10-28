import { Module } from '@nestjs/common';
import { UserModule } from './auth/user.module';


@Module({
    imports:[
        UserModule
    ],
})
export class FeatureModule {}
