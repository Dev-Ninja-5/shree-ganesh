import { DocumentIF } from "./common";

export enum Role {
  ADMIN = "admin",
  EMPLOYEE= "employee",
}
export type RoleType = Role.ADMIN | Role.EMPLOYEE

export interface UserIF extends DocumentIF {
  name:string;
  email:string;
  password:string;
  role:string;
  phone:number;
  is_disabled:boolean;
}

