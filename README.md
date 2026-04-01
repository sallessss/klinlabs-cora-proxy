# KlinLabs Cora Proxy

Proxy Node.js + Express com mTLS para integrar com a API da Cora (client credentials - integracao direta).

## Scripts
- npm run dev
- npm run build
- npm start

## Como funciona
- O proxy autentica via mTLS e client credentials (somente `client_id`).
- O token e cacheado em memoria ate expirar (com margem de 60s).
- Para chamadas na Cora, o proxy adiciona `Authorization: Bearer <token>` e `Idempotency-Key`.
- Os endpoints sao separados por dominio (boletos, pix, conta, pagamentos, transferencias).
- Todas as rotas exigem `x-api-token` configurado em `API_TOKEN`.

## Subindo o servidor
```
npm install
npm run dev
```

## Rotas
### Token
- POST /cora/token

### Boletos (Invoices)
- POST /cora/invoices
- GET /cora/invoices
- GET /cora/invoices/:invoiceId
- DELETE /cora/invoices/:invoiceId
- GET /cora/invoices/:invoiceId/notifications
- DELETE /cora/invoices/:invoiceId/notifications

### Pix (QR Code)
- POST /cora/pix/qr-code

### Conta
- GET /cora/account
- GET /cora/account/balance
- GET /cora/account/statement

### Pagamentos (Codigo de barras)
- POST /cora/payments/initiate
- GET /cora/payments
- DELETE /cora/payments/initiate/:paymentId

### Transferencias
- POST /cora/transfers/initiate
- GET /cora/transfers
- GET /cora/banks

## Exemplos de requisicao
### Gerar boleto
```
curl -X POST http://localhost:3000/cora/invoices \
	-H "x-api-token: seutoken" \
	-H "Content-Type: application/json" \
	-d "{\"code\":\"seuid\",\"customer\":{\"name\":\"Fulano da silva\",\"email\":\"fulano@email.com\",\"document\":{\"identity\":\"00000000000\",\"type\":\"CPF\"},\"address\":{\"street\":\"Rua tal\",\"number\":\"1\",\"district\":\"Recife\",\"city\":\"Recife\",\"state\":\"PE\",\"complement\":\"N/A\",\"zip_code\":\"00000000\"}},\"services\":[{\"name\":\"Servico B\",\"description\":\"Teste\",\"amount\":49500}],\"payment_terms\":{\"due_date\":\"2026-03-30\",\"fine\":{\"amount\":10800},\"discount\":{\"type\":\"PERCENT\",\"value\":1.5}},\"notification\":{\"name\":\"Tal tal tal\",\"channels\":[{\"channel\":\"EMAIL\",\"contact\":\"fulano@cora.com.br\",\"rules\":[\"NOTIFY_TWO_DAYS_BEFORE_DUE_DATE\",\"NOTIFY_WHEN_PAID\"]},{\"channel\":\"SMS\",\"contact\":\"+5511999999999\",\"rules\":[\"NOTIFY_TWO_DAYS_BEFORE_DUE_DATE\",\"NOTIFY_WHEN_PAID\"]}]},\"payment_forms\":[\"BANK_SLIP\",\"PIX\"]}"
```

### Consultar boletos
```
curl -X GET "http://localhost:3000/cora/invoices?start=2024-01-01&end=2024-01-31&page=1&perPage=20"
```

### Consultar detalhes do boleto
```
curl -X GET http://localhost:3000/cora/invoices/inv_SEU_ID
```

### Cancelar boleto
```
curl -X DELETE http://localhost:3000/cora/invoices/inv_SEU_ID
```

### Gerar QR Code Pix
```
curl -X POST http://localhost:3000/cora/pix/qr-code \
	-H "Content-Type: application/json" \
	-d "{\"code\":\"meu_id\",\"customer\":{\"name\":\"Fulano\",\"email\":\"fulano@email.com\",\"document\":{\"identity\":\"34052649000178\",\"type\":\"CNPJ\"},\"address\":{\"street\":\"Rua Gomes de Carvalho\",\"number\":\"1629\",\"district\":\"Vila Olimpia\",\"city\":\"Sao Paulo\",\"state\":\"SP\",\"complement\":\"N/A\",\"zip_code\":\"00111222\"}},\"services\":[{\"name\":\"Nome do servico\",\"description\":\"Descricao\",\"amount\":25000}],\"payment_terms\":{\"due_date\":\"2024-08-25\"},\"payment_forms\":[\"PIX\"]}"
```

### Dados e saldo da conta
```
curl -X GET http://localhost:3000/cora/account
curl -X GET http://localhost:3000/cora/account/balance
```

### Extrato
```
curl -X GET "http://localhost:3000/cora/account/statement?start=2026-01-15&end=2026-01-16&type=DEBIT&transaction_type=TRANSFER&page=1&perPage=10&aggr=false"
```

### Iniciar pagamento (codigo de barras)
```
curl -X POST http://localhost:3000/cora/payments/initiate \
	-H "Content-Type: application/json" \
	-d "{\"code\":\"meu_id\",\"digitable_line\":\"40390000071081083000900074887019995620000002344\",\"scheduled_at\":\"2026-01-01\"}"
```

### Listar pagamentos
```
curl -X GET "http://localhost:3000/cora/payments?status=INITIATED&start=2026-11-15&end=2026-11-16&page=0&size=10"
```

### Cancelar pagamento
```
curl -X DELETE http://localhost:3000/cora/payments/initiate/pay_SEU_ID
```

### Iniciar transferencia
```
curl -X POST http://localhost:3000/cora/transfers/initiate \
	-H "Content-Type: application/json" \
	-d "{\"destination\":{\"account_type\":\"CHECKING\",\"bank_code\":\"341\",\"account_number\":\"092135\",\"branch_number\":\"7679\",\"holder\":{\"name\":\"Cora Pagamentos\",\"document\":{\"identity\":\"72420176000104\",\"type\":\"CNPJ\"}}},\"amount\":10001,\"description\":\"Mandando\",\"code\":\"EXP123\",\"category\":\"PAYROLL\",\"scheduled\":\"2026-05-31\"}"
```

### Listar transferencias e bancos
```
curl -X GET "http://localhost:3000/cora/transfers?status=COMPLETED&start=2022-01-01&end=2023-07-10&page=0&size=10"
curl -X GET http://localhost:3000/cora/banks
```

## Rotas
- POST /cora/token
