import express,{ Express } from 'express';
import { config } from 'dotenv';
import nftRoutes from "./routes/nft.routes"
import walletRoutes from "./routes/wallet.routes"

config()
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/nft", nftRoutes)
app.use("/api/v1/wallets", walletRoutes)

export default app;

