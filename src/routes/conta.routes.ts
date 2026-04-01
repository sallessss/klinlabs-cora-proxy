import { Express } from "express";
import { ContaController } from "../controllers/conta.controller";
import { coraAuthMiddleware } from "../middlewares/coraAuth";

export function registerContaRoutes(app: Express) {
  const controller = new ContaController();

  app.get(
    "/cora/account",
    coraAuthMiddleware,
    controller.getAccount.bind(controller)
  );

  app.get(
    "/cora/account/balance",
    coraAuthMiddleware,
    controller.getBalance.bind(controller)
  );

  app.get(
    "/cora/account/statement",
    coraAuthMiddleware,
    controller.getStatement.bind(controller)
  );
}
