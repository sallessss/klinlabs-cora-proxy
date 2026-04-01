import { TokenResponse } from "../models/token.model";
import { CoraRepository } from "../repositories/cora.repo";

export class CoraService {
  private readonly repository = new CoraRepository();
  private cachedToken: TokenResponse | null = null;
  private tokenExpiresAt = 0;
  private readonly expirySkewMs = 60_000;

  async getAccessToken(): Promise<TokenResponse> {
    if (this.cachedToken && Date.now() < this.tokenExpiresAt) {
      return this.cachedToken;
    }

    const token = await this.repository.fetchAccessToken();
    const expiresInMs = Math.max(0, token.expires_in * 1000 - this.expirySkewMs);

    this.cachedToken = token;
    this.tokenExpiresAt = Date.now() + expiresInMs;

    return token;
  }
}
