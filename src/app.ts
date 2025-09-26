import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectToDatabase from "./config/connectToDatabase";
import appRouter from "./routes/appRouter";

dotenv.config();

connectToDatabase();

const app = express()
const PORT = Number(process.env.PORT) || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(appRouter);

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
})