import express from "express";
import { apiRouter } from "./api.mjs";

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use("/api/v1", apiRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
