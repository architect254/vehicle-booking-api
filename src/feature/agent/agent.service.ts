import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Agent } from './agent.entity';
import { CreateAgentDto } from './create-agent.dto';
import { UpdateAgentDto } from './update-agent.dto';
import { User } from '../../shared/user/user.entity';

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(Agent)
    private agentRepo: Repository<Agent>,
  ) {}

  async create(payload: CreateAgentDto, currentUser: User): Promise<string> {
    const agent = new Agent();

    Object.assign(agent, payload);

    agent.createdBy = currentUser;
    agent.updatedBy = currentUser;

    await this.save(agent);

    return `Agent ${agent.name} created`;
  }

  async read(id): Promise<Agent> {
    const agent = await this.agentRepo
      .createQueryBuilder('agent')
      .where('agent.id =:id', { id })
      .leftJoinAndSelect('agent.createdBy', 'createdBy')
      .leftJoinAndSelect('agent.updatedBy', 'updatedBy')
      .getOne();

    if (!agent || !Object.keys(agent).length) {
      const errorMessage = `Agent:${id} not found`;
      throw new NotFoundException(errorMessage);
    }

    return agent;
  }

  async readAll(page: number, pageSize: number): Promise<Agent[]> {
    const skip: number = pageSize * (page - 1);

    return await this.agentRepo.find({ skip: 10, take: pageSize });
  }

  async update(
    id,
    payload: UpdateAgentDto,
    currentUser: User,
  ): Promise<string> {
    const agent: Agent = await this.read(id);

    Object.assign(agent, payload);
    agent.updatedBy = currentUser;

    await this.agentRepo.save(agent);

    return `Agent ${agent.name} updated successfuly`;
  }

  async drop(id): Promise<string> {
    const agent: Agent = await this.read(id);
    const deletedAgent = await this.agentRepo.remove(agent);

    if (!deletedAgent) {
      const errorMessage = `Failed to delete agent:${deletedAgent.id}`;
      throw new InternalServerErrorException(errorMessage);
    }

    return `Agent ${deletedAgent.name} deleted successfuly`;
  }

  async save(agent: Agent): Promise<Agent> {
    try {
      return await this.agentRepo.save(agent);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('Agent already exists');
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
