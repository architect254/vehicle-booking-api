import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';

import { Repository } from 'typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { User } from '../shared/user/user.entity';

import { JwtPayload } from '../shared/jwt.payload';


import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const userPayload = payload.user;
    const email = userPayload.email;
    const foundUser = await this.userRepo.findOne({where:{ email }});

    if (!foundUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return foundUser;
  }
}
