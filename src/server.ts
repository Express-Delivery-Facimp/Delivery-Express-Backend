// Modules Imports
import app from "./app";

// Dotenv Config
import dotenv from "dotenv";
import express, { Request, Response } from "express";
dotenv.config();

const PORT = process.env.PORT || 9896;

app.use(express.json())
app.listen(PORT, () => {
  console.clear();
  console.log(`⚡ Server is running on port ${PORT}.`);
});
