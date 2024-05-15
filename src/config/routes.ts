import authRouter from "../route/auth";
import PolicyRouter from "../route/policy";

const routes = (app: any) => {
  app.use("/auth", authRouter);
  app.use("/policy", PolicyRouter);
};

export default routes;
