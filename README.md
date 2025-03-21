# Westend & Paseo Testnet Faucet

This project is a sybil-resistant faucet designed for the Polkadot ecosystem, supporting both Westend and Paseo test networks.

Users can claim free test tokens (WND / PSO) by verifying their identity using TOTP (Time-based One-Time Password) via Google Authenticator. The faucet also enforces rate limits using Redis, allowing only one request per user every 24 hours.

# ✨ Features

✅ Supports Westend and Paseo testnets

🔐 TOTP-based verification via Google Authenticator

🧠 24-hour Redis-based rate limiting per user

⚙️ Backend with NestJS and Polkadot.js API

💅 Frontend with React + Material UI (MUI)

🛠️ How to Run the Project

1. Clone the Repository

```sh
git clone https://github.com/your-username/westend-paseo-faucet.git
cd westend-paseo-faucet
```

2. Start Redis

Make sure you have Redis running locally:

```sh
redis-server
```

3. Backend Setup

```sh
cd backend
npm install
```

Create a .env file in the backend/ directory:

```sh
PORT=1337
FAUCET_MNEMONIC="your faucet wallet mnemonic"
WESTEND_RPC=wss://westend-rpc.polkadot.io
PASEO_RPC=wss://paseo-rpc.polkadot.io
REDIS_URL=redis://localhost:6379
```

Then run:

```sh
npm run start
```

Backend should now be running at http://localhost:1337

4. Frontend Setup

```sh
cd ../frontend
npm install
npm start
```
Frontend should now be running at http://localhost:3000

# 🧪 Usage

* Open the frontend and scan the QR code using Google Authenticator

* Use the app to submit your OTP code and wallet address

* Select the target network (Westend or Paseo)

* Tokens will be transferred automatically upon verification

# 🗺️ Roadmap / Coming Soon

📬 Switch to Email-based OTP (optional authentication method)

🌍 Deployable version on testnet faucet subdomain

📈 Admin dashboard with claim analytics

🔐 Wallet signature authentication alternative

📦 Docker & Railway deployment scripts

# 📝 License

Apache 2.0
