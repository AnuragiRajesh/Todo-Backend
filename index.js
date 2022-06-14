const express = require("express");
const res = require("express/lib/response");
const app = express();
const cors = require("cors");
const port = 8000;
const {
  createItem,
  getItem,
  deleteItem,
} = require("./controlers/item.controler");
const {
  createUser,
  getUser,
  deleteUser,
  Login,
} = require("./controlers/user.controler");
const { AuthenticationToken } = require("./auth/jwt");
// const {createVer, getVer}=require('./controlers/verrification')
app.use(express.json());
app.use(cors({ origin: "*" }));

// app.post("/data", createItem);
// app.get("/data",  getItem);
// app.delete("/data", deleteItem);
app.post("/data", AuthenticationToken, createItem);
app.get("/data", AuthenticationToken, getItem);
app.delete("/data",AuthenticationToken, deleteItem);


app.post("/user", createUser);
app.get("/user", getUser);
app.delete("/user", deleteUser);

app.post("/login", Login)

app.listen(port, () => {
  console.log(`listing on port ${port}`);
});
