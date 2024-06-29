/* eslint-disable no-undef */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./db");

const app = express();

// Logging + Formatting
//const loggingFormat = process.env.NODE_ENV === "dev" ? "dev" : "tiny";
const loggingFormat = "dev";
app.use(morgan(loggingFormat));

app.use(cors());

// Render has app behind a proxy
app.set("trust proxy", 1);

app.use(express.json());

app.get('/manifestation', async (req, resp) => {
  console.log('calling /manifestation endpoint...');
  const result = await db.getManifestation();
  if (result.manifestation) {
    resp.send({ ...result.manifestation });
  } else if (result.error) {
    resp.status(500).json({ error: result.error });
  } else {
    resp.status(500).json({ error: "Unknown error" });
  }
});

const PORT = `${process.env.SERVER_PORT}`;
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});