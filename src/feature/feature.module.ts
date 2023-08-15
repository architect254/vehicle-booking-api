import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { AgentModule } from './agent/agent.module';
import { ProviderModule } from './provider/provider.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { RouteModule } from './route/route.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    AgentModule,
    ProviderModule,
    VehicleModule,
    RouteModule,
  ],
  exports: [
    UserModule,
    AuthModule,
    AgentModule,
    ProviderModule,
    VehicleModule,
    RouteModule,
  ],
})
export class FeatureModule {}
