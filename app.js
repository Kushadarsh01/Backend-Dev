import express from "express";
import dotenv from "dotenv";

import createUser from "./src/users/createUser.js";
import filterUser from "./src/users/filterUser.js";
import getAllUsers from "./src/users/getAllUsers.js";
import updateUser from "./src/users/updateUser.js";
import deleteUser from "./src/users/deleteUser.js";
import searchUser from "./src/users/searchUser.js";

import blogList from "./src/blog/blogList.js";
import blogCreate from "./src/blog/blogCreate.js";
import blogView from "./src/blog/blogView.js";

import getContact from "./src/contact/getContact.js";
import postContact from "./src/contact/postContact.js";
import getGallery from "./src/gallery/getGallery.js";

import responseTimeLogger from "./src/middlewares/responseTimeLogger.js";
import notFound from "./src/middlewares/notFound.js";

dotenv.config();

const app = express();
let port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); 

app.use(responseTimeLogger);

app.post("/register", createUser);
app.post("/find", filterUser);
app.get("/users", getAllUsers);
app.put("/update", updateUser);
app.delete("/delete", deleteUser);
app.get("/search", searchUser);

app.get("/contact", getContact);
app.post("/contact", postContact);

app.get("/gallery", getGallery);

app.get("/blog", blogList);
app.post("/blog", blogCreate);
app.get("/blog/:id", blogView);

app.use(notFound);

app.listen(port, () => {
    console.log("Server running on port : ", port);
});