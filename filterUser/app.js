import express from "express";
import dotenv from "dotenv";
import createUser from "./src/createUser.js";
import filterUser from "./src/filterUser.js";

dotenv.config();

const app = express();
let port = process.env.PORT;

app.use(express.json());

app.post("/register", createUser);
app.post("/find", filterUser);

app.listen(port, () => {
    console.log("Server running on port : ", port);
})
