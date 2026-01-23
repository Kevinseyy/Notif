import express from "express";
import { apiRouter } from "./api.mjs";

const PORT = 8080;
const app = new express();

app.use(express.json());
app.use(express.static("public"));

app.use("/api/v1", apiRouter);

app.get("/", (req, res) => {
  res.send("Hello Class!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
