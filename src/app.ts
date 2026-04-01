import "dotenv/config";
import express from "express";
import { apiKeyAuth } from "./middlewares/apiKeyAuth";
import { errorHandler } from "./middlewares/errorHandler";
import { requestLogger } from "./middlewares/requestLogger";
import { registerBoletoRoutes } from "./routes/boleto.routes";
import { registerContaRoutes } from "./routes/conta.routes";
import { registerCoraRoutes } from "./routes/cora.routes";
import { registerPagamentosRoutes } from "./routes/pagamentos.routes";
import { registerPixRoutes } from "./routes/pix.routes";
import { registerTransferenciasRoutes } from "./routes/transferencias.routes";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(requestLogger);
  app.use(apiKeyAuth);

  registerCoraRoutes(app);
  registerBoletoRoutes(app);
  registerPixRoutes(app);
  registerContaRoutes(app);
  registerPagamentosRoutes(app);
  registerTransferenciasRoutes(app);

  app.use(errorHandler);

  return app;
}
