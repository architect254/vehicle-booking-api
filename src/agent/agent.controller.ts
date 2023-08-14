import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Query,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from 'src/auth/get-user.decorator';
import { AgentService } from './agent.service';

import { CreateAgentDto } from './create-agent.dto';
import { UpdateAgentDto } from './update-agent.dto';
import { User } from '../user/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('Agents')
export class AgentController {
  constructor(private agentService: AgentService) {}

  @Post()
  async createAgent(
    @Body() payload: CreateAgentDto,
    @GetUser() currentUser: User,
  ) {
    return await this.agentService.create(payload, currentUser);
  }

  @Get('/:id')
  async getAgent(@Param('id') id) {
    return await this.agentService.read(id);
  }

  @Get()
  async getAllAgents(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.agentService.readAll(page, pageSize);
  }

  @Put('/:id')
  async updateAgent(
    @Param('id') id,
    @Body() payload: UpdateAgentDto,
    @GetUser() currentUser: User,
  ) {
    return await this.agentService.update(id, payload, currentUser);
  }

  @Delete('/:id')
  async deleteAgent(@Param('id') id) {
    return await this.agentService.drop(id);
  }
}
