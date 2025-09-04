import { Role } from "./role.type";

export type JwtPayload = {
  email: string;
  sub: number;
  role: Role;
  exp: number;
};
