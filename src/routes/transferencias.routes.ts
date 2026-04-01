import { Express } from "express";
import { TransferenciasController } from "../controllers/transferencias.controller";
import { coraAuthMiddleware } from "../middlewares/coraAuth";

export function registerTransferenciasRoutes(app: Express) {
  const controller = new TransferenciasController();

  app.post(
    "/cora/transfers/initiate",
    coraAuthMiddleware,
    controller.initiateTransfer.bind(controller)
  );

  app.get(
    "/cora/transfers",
    coraAuthMiddleware,
    controller.listTransfers.bind(controller)
  );

  app.get(
    "/cora/banks",
    coraAuthMiddleware,
    controller.listBanks.bind(controller)
  );
}
