import CONSTANTS from "../../constants/common";
import { ClientIF } from "../../types/AuthIF";
import AccessController from "../access";
import * as CustomerService from "./policy.service";
import keys from "../../config/keys";

const { RESOURCES } = CONSTANTS;
const SERVICE = RESOURCES.POLICY;
export const list = async (client: ClientIF, args: any) => {
  let permissions = AccessController.can(client.role).read(SERVICE);
  if (!permissions.granted) throw { status: 403, message: "Access Denied" };
  return CustomerService.list(args);
};

export const single = async (id: string, client: ClientIF) => {
  let permissions = AccessController.can(client.role).read(SERVICE);
  if (!permissions.granted) throw { status: 403, message: "Access Denied" };
  return CustomerService.single(id);
};

export const create = async (data: any, client: ClientIF) => {
  let permissions = AccessController.can(client.role).create(SERVICE);
  if (!permissions.granted) throw { status: 403, message: "Access Denied" };
  return CustomerService.create(data);
};

export const update = async (id: string, data: any, client: ClientIF) => {
  let permissions = AccessController.can(client.role).updateAny(SERVICE);
  if (!permissions.granted) throw { status: 403, message: "Access Denied" };
  return CustomerService.update(id, data);
};

export const remove = async (id: string, client: ClientIF) => {
  let permissions = AccessController.can(client.role).delete(SERVICE);
  if (!permissions.granted) throw { status: 403, message: "Access Denied" };
  return CustomerService.remove(id);
};
