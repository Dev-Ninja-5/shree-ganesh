import { RequestHandler } from "express";

import { unlock } from "../utils/locker";

import { ClientIF } from "../types/AuthIF";
import keys from "../../src/config/keys";
import jwt from "jsonwebtoken";

export const strict: RequestHandler = async (
  request: any,
  response: any,
  next
) => {
  let client: ClientIF, decoded: any;
  try {
    decoded = await unlock(request);
    client = decoded;
    request.client = client;
    next();
  } catch (err) {
    try {
      throw { status: 401 };
    } catch (err) {
      next(err);
    }
  }
};
