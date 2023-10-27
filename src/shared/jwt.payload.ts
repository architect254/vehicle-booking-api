import { User } from "../core/user/user.entity";

export interface JwtPayload {
  user: User;
}
