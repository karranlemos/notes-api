import express, { Application } from "express";

const PORT = 3667;

const app: Application = express();

app.get("/", (request, response) => response.send("/"));

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
