import { Access, AccessControl } from "accesscontrol";

import CONSTANTS from "../constants/common";

import { Role } from "../types/UserIF";

const { RESOURCES } = CONSTANTS;

const AccessController = new AccessControl();

//  Admin's permissions
AccessController.grant(Role.ADMIN)
  .resource(RESOURCES.POLICY)
  .create()
  .read()
  .update()
  .delete();
AccessController.grant(Role.EMPLOYEE)
  .resource(RESOURCES.POLICY)
  .create()
  .read()
  .update()
  .delete();

AccessController.grant(Role.ADMIN)
  .resource(RESOURCES.USER)
  .create()
  .read()
  .update()
  .delete();
export default AccessController;
