import { env } from "../config/env";
import { mtlsHttpClient } from "../config/httpClient";
import { TokenResponse } from "../models/token.model";

export class CoraRepository {
  async fetchAccessToken(): Promise<TokenResponse> {
    const payload = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: env.coraClientId
    });

    const response = await mtlsHttpClient.post<TokenResponse>(
      `${env.coraBaseUrl}/token`,
      payload,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    return response.data;
  }
}
