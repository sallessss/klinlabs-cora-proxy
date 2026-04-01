import { ContaRepository } from "../repositories/conta.repo";
import { CoraAuthContext } from "../repositories/coraHeaders";

export class ContaService {
  private readonly repository = new ContaRepository();

  async getAccount(auth: CoraAuthContext) {
    return this.repository.getAccount(auth);
  }

  async getBalance(auth: CoraAuthContext) {
    return this.repository.getBalance(auth);
  }

  async getStatement(auth: CoraAuthContext, query: unknown) {
    return this.repository.getStatement(auth, query);
  }
}
