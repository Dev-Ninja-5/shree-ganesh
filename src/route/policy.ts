import { NextFunction, Router } from "express";
import * as Auth from "../middlewares/auth";
import * as policyController from "../controllers/policy/policy.controller";
import * as policyValidation from "../controllers/policy/policy.validation";
import { createValidator } from "express-joi-validation";

const router = Router();
const validator = createValidator({ passError: true });

router.get(
  "/",
  Auth.strict,
  validator.query(policyValidation.query),
  async (req: any, res: any, next: NextFunction) => {
    try {
      return res.reply({
        data: await policyController.list(req.client, req.query),
      });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:id",
  Auth.strict,
  validator.params(policyValidation.single),
  async (req: any, res: any, next: NextFunction) => {
    try {
      return res.reply({
        data: await policyController.single(req.params.id, req.client),
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/",
  Auth.strict,
  validator.body(policyValidation.create),
  async (req: any, res: any, next: NextFunction) => {
    try {
      return res.reply({
        data: await policyController.create(req.body, req.client),
      });
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  Auth.strict,
  validator.body(policyValidation.update),
  async (req: any, res: any, next: NextFunction) => {
    try {
      return res.reply({
        data: await policyController.update(
          req.params.id,
          req.body,
          req.client
        ),
      });
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:id",
  Auth.strict,
  validator.params(policyValidation.single),
  async (req: any, res: any, next: NextFunction) => {
    try {
      return res.reply({
        data: await policyController.remove(req.params.id, req.client),
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
