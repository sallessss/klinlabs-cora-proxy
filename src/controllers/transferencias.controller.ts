import { NextFunction, Request, Response } from "express";
import { CoraAuthContext } from "../repositories/coraHeaders";
import { TransferenciasService } from "../services/transferencias.service";

export class TransferenciasController {
  private readonly service = new TransferenciasService();

  private getAuth(res: Response) {
    const auth = res.locals.coraAuth as CoraAuthContext | undefined;

    if (!auth?.accessToken) {
      throw new Error("Acesso negado");
    }

    return auth;
  }

  async initiateTransfer(req: Request, res: Response, next: NextFunction) {
    try {
      const auth = this.getAuth(res);
      const result = await this.service.initiateTransfer(auth, req.body);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  async listTransfers(req: Request, res: Response, next: NextFunction) {
    try {
      const auth = this.getAuth(res);
      const result = await this.service.listTransfers(auth, req.query);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  async listBanks(_req: Request, res: Response, next: NextFunction) {
    try {
      const auth = this.getAuth(res);
      const result = await this.service.listBanks(auth);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }
}
