import mongoose from "mongoose";

import logger from "../utils/logger";

import keys from "./keys";

const message = (msg: string) => logger.info(`SUCCESS | ${msg} Service`);

export const init = async () => {
  await mongoose.connect(keys?.mongodb);
  message("Mongodb");
};

export default mongoose.connection;
