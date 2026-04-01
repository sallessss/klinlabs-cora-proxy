import { NextFunction, Request, Response } from "express";
import { CoraAuthContext } from "../repositories/coraHeaders";
import { PagamentosService } from "../services/pagamentos.service";

export class PagamentosController {
  private readonly service = new PagamentosService();

  private getAuth(res: Response) {
    const auth = res.locals.coraAuth as CoraAuthContext | undefined;

    if (!auth?.accessToken) {
      throw new Error("Acesso negado");
    }

    return auth;
  }

  async initiatePayment(req: Request, res: Response, next: NextFunction) {
    try {
      const auth = this.getAuth(res);
      const result = await this.service.initiatePayment(auth, req.body);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  async listPayments(req: Request, res: Response, next: NextFunction) {
    try {
      const auth = this.getAuth(res);
      const result = await this.service.listPayments(auth, req.query);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  async cancelPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const auth = this.getAuth(res);
      const result = await this.service.cancelPayment(auth, req.params.paymentId);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }
}
