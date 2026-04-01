import { CoraAuthContext } from "../repositories/coraHeaders";
import { PixRepository } from "../repositories/pix.repo";

export class PixService {
  private readonly repository = new PixRepository();

  async createQrCode(auth: CoraAuthContext, payload: unknown) {
    return this.repository.createQrCode(auth, payload);
  }
}
