import fs from "fs";
import Joi from "joi";
import sha256 from "sha256";

import keys from "../config/keys";
import { AuthorIF } from "../types/common";

export const hash = (str: string) => {
  return sha256(str + keys.secret);
};

export const time = () => Math.floor(Date.now() / 1000);

export const pickRandom = (data: any, { count = 1 } = {}) => {
  if (!Array.isArray(data)) {
    throw new TypeError("Expected an array as the first argument");
  }

  if (count > data.length) {
    throw new Error("Count must be lower or the same as the number of picks");
  }

  data = [...data];

  const pickedElements = [];

  while (count--) {
    pickedElements.push(
      data.splice(Math.floor(Math.random() * data.length), 1)[0]
    );
  }

  return pickedElements;
};

export const authorSchemaValidator = Joi.object<AuthorIF>({
  name: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  is_verified: Joi.boolean().optional(),
});

export const genericQueries = {
  limit: Joi.number().integer().default(25).max(50).optional(),
  offset: Joi.number().integer().default(0).optional(),
  page: Joi.number().integer().default(1).min(1).optional(),
};

export const Paginator = (Modal: any, ...args: any) => Modal.paginate(...args);

export const filterQuery = (
  qry: any,
  filters: string[],
  searchFields: string[]
) => {
  const args: any = {};

  const query = Object.assign({}, qry);

  filters.forEach((filter) => {
    if (query[filter] && !args[filter]) {
      args[filter] = query[filter];
      delete query[filter];
    }
  });

  // optimised search ( indexed )
  if (query.search) {
    const searchKey = new RegExp(`^${query.search.replace("+", "\\+")}`, "i");

    searchFields.map((path) => {
      const expression = { [path]: { $regex: searchKey } };
      if (args["$or"]) {
        args["$or"].push(expression);
      } else {
        args["$or"] = [expression];
      }
    });

    delete query.search;
  }

  return { args, query };
};

export const removeFile = (path: string) => {
  // Remove the file after reading
  fs.unlink(path, (unlinkErr) => {
    if (unlinkErr) {
      return console.error("Error deleting the file:", unlinkErr);
    }
    console.log("File deleted successfully!");
  });
};
