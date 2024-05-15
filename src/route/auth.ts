import { Router } from "express";
import { createValidator } from "express-joi-validation";

import * as authController from "../controllers/auth/auth.controller";
import * as authValidation from "../controllers/auth/auth.validation";

const validator = createValidator({ passError: true });

const router = Router();

router.post(
  "/login",
  validator.body(authValidation.login),
  async function (req: any, res: any, next: any) {
    try {
      return res.reply({
        data: await authController.login(req.body),
      });
    } catch (err) {
      return next(err);
    }
  }
);

router.post(
  "/register",
  validator.body(authValidation.register),
  async function (req: any, res: any, next) {
    try {
      return res.reply({
        data: await authController.register(req.body),
      });
    } catch (err) {
      return next(err);
    }
  }
);

router.post("/create", async (req: any, res: any, next: any) => {
  try {
    return res.reply(await authController.create(req.body));
  } catch (err) {
    next(err);
  }
});

export default router;