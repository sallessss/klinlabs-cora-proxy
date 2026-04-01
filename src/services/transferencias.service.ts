import { CoraAuthContext } from "../repositories/coraHeaders";
import { TransferenciasRepository } from "../repositories/transferencias.repo";

export class TransferenciasService {
  private readonly repository = new TransferenciasRepository();

  async initiateTransfer(auth: CoraAuthContext, payload: unknown) {
    return this.repository.initiateTransfer(auth, payload);
  }

  async listTransfers(auth: CoraAuthContext, query: unknown) {
    return this.repository.listTransfers(auth, query);
  }

  async listBanks(auth: CoraAuthContext) {
    return this.repository.listBanks(auth);
  }
}
