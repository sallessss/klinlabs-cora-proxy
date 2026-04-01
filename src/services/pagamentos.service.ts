import { CoraAuthContext } from "../repositories/coraHeaders";
import { PagamentosRepository } from "../repositories/pagamentos.repo";

export class PagamentosService {
  private readonly repository = new PagamentosRepository();

  async initiatePayment(auth: CoraAuthContext, payload: unknown) {
    return this.repository.initiatePayment(auth, payload);
  }

  async listPayments(auth: CoraAuthContext, query: unknown) {
    return this.repository.listPayments(auth, query);
  }

  async cancelPayment(auth: CoraAuthContext, paymentId: string) {
    return this.repository.cancelPayment(auth, paymentId);
  }
}
