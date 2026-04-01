import { BoletoRepository } from "../repositories/boleto.repo";
import { CoraAuthContext } from "../repositories/coraHeaders";

export class BoletoService {
  private readonly repository = new BoletoRepository();

  async createInvoice(auth: CoraAuthContext, payload: unknown) {
    return this.repository.createInvoice(auth, payload);
  }

  async listInvoices(auth: CoraAuthContext, query: unknown) {
    return this.repository.listInvoices(auth, query);
  }

  async getInvoice(auth: CoraAuthContext, invoiceId: string) {
    return this.repository.getInvoice(auth, invoiceId);
  }

  async cancelInvoice(  auth: CoraAuthContext, invoiceId: string) {
    return this.repository.cancelInvoice(auth, invoiceId);
  }

  async listInvoiceNotifications(auth: CoraAuthContext, invoiceId: string, query: unknown) {
    return this.repository.listInvoiceNotifications(auth, invoiceId, query);
  }

  async cancelInvoiceNotification(auth: CoraAuthContext, invoiceId: string) {
    return this.repository.cancelInvoiceNotification(auth, invoiceId);
  }
}
