import { Express } from "express";
import { PagamentosController } from "../controllers/pagamentos.controller";
import { coraAuthMiddleware } from "../middlewares/coraAuth";

export function registerPagamentosRoutes(app: Express) {
  const controller = new PagamentosController();

  app.post(
    "/cora/payments/initiate",
    coraAuthMiddleware,
    controller.initiatePayment.bind(controller)
  );

  app.get(
    "/cora/payments",
    coraAuthMiddleware,
    controller.listPayments.bind(controller)
  );

  app.delete(
    "/cora/payments/initiate/:paymentId",
    coraAuthMiddleware,
    controller.cancelPayment.bind(controller)
  );
}
