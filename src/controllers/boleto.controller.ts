import { NextFunction, Request, Response } from "express";
import { CoraAuthContext } from "../repositories/coraHeaders";
import { BoletoService } from "../services/boleto.service";

export class BoletoController {
  private readonly service = new BoletoService();

  private getAuth(res: Response) {
    const auth = res.locals.coraAuth as CoraAuthContext | undefined;

    if (!auth?.accessToken) {
      throw new Error("Acesso negado");
    }

    return auth;
  }

  async createInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const auth = this.getAuth(res);

      const result = await this.service.createInvoice(auth, req.body);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  async listInvoices(req: Request, res: Response, next: NextFunction) {
    try {
      const auth = this.getAuth(res);
      const result = await this.service.listInvoices(auth, req.query);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  async getInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const auth = this.getAuth(res);
      const result = await this.service.getInvoice(auth, req.params.invoiceId);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  async cancelInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const auth = this.getAuth(res);
      const result = await this.service.cancelInvoice(
        auth,
        req.params.invoiceId
      );
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  async listInvoiceNotifications(req: Request, res: Response, next: NextFunction) {
    try {
      const auth = this.getAuth(res);
      const result = await this.service.listInvoiceNotifications(
        auth,
        req.params.invoiceId,
        req.query
      );
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  async cancelInvoiceNotification(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const auth = this.getAuth(res);
      const result = await this.service.cancelInvoiceNotification(
        auth,
        req.params.invoiceId
      );
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }
}
