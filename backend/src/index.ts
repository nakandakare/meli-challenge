import express, { Express } from "express";
import dotenv from "dotenv";
import itemsRoutes from "./routes/item.routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/items", itemsRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
