import express from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

import authRouter from "./routes/auth";
dotenv.config();

const app = express();
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

app.use((req, res, next) => {
  // @ts-ignore -> express Request tipine custom property ekliyoruz
  req.supabase = supabase;
  next();
});

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Supabase + Express + TypeScript API 🚀");
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
