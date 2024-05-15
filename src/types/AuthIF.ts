import { RoleType } from "./UserIF";

export interface ClientIF {
  _id: string;
  iat: number;
  exp: number;
  iss: string;
  email: string;
  role: RoleType;
  name?: string;
  profile: string | undefined;
}
