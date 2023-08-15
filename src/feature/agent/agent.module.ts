import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AgentService } from './agent.service';
import { Agent } from './agent.entity';
import { AgentController } from './agent.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Agent])],
  controllers: [AgentController],
  providers: [AgentService],
  exports: [AgentService],
})
export class AgentModule {}
