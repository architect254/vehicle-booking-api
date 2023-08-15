import { User } from "../feature/user/user.entity";

export interface JwtPayload {
  user: User;
}
