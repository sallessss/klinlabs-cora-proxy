export const env = {
  port: Number(process.env.PORT),
  apiToken: process.env.API_TOKEN,
  coraClientId: process.env.CORA_CLIENT_ID || "",
  coraBaseUrl: process.env.CORA_BASE_URL || "",
  mtlsCertPath: process.env.MTLS_CERT_PATH || "",
  mtlsKeyPath: process.env.MTLS_KEY_PATH || "",
  mtlsCaPath: process.env.MTLS_CA_PATH || ""
};
