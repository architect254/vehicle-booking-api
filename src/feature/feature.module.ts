import { Module } from '@nestjs/common';

import { AgentModule } from './agent/agent.module';
import { ProviderModule } from './provider/provider.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { RouteModule } from './route/route.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    AgentModule,
    ProviderModule,
    VehicleModule,
    RouteModule,
  ],
})
export class FeatureModule {}
