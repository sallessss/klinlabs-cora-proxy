import { Express } from "express";
import { BoletoController } from "../controllers/boleto.controller";
import { coraAuthMiddleware } from "../middlewares/coraAuth";

export function registerBoletoRoutes(app: Express) {
  const controller = new BoletoController();

  app.post(
    "/cora/invoices",
    coraAuthMiddleware,
    controller.createInvoice.bind(controller)
  );

  app.get(
    "/cora/invoices",
    coraAuthMiddleware,
    controller.listInvoices.bind(controller)
  );

  app.get(
    "/cora/invoices/:invoiceId",
    coraAuthMiddleware,
    controller.getInvoice.bind(controller)
  );

  app.delete(
    "/cora/invoices/:invoiceId",
    coraAuthMiddleware,
    controller.cancelInvoice.bind(controller)
  );

  app.get(
    "/cora/invoices/:invoiceId/notifications",
    coraAuthMiddleware,
    controller.listInvoiceNotifications.bind(controller)
  );

  app.delete(
    "/cora/invoices/:invoiceId/notifications",
    coraAuthMiddleware,
    controller.cancelInvoiceNotification.bind(controller)
  );
}
