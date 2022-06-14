const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
// const md5 = require("md5");
const bcrypt = require("bcrypt");
const { stringify } = require("nodemon/lib/utils");
const { AuthorizationToken } = require("../auth/jwt");

const createUser = async (req, res) => {
  let { name, email, password } = req.body;
  try {
    password = bcrypt.hash(password, 10);
    password = stringify(password)
    // console.log(password2)
    // let password3 ="ertu"

    console.log(password);

    const result = await prisma.user.create({
      data: { name, email, password },
    });
    const token = AuthorizationToken(result);
    res.cookie("token", token)
    res.status(200).json({ msg: "successfully signed UP", result });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: "Bad request", error });
  }
};

const getUser = async (req, res) => {
  try {
    const result = await prisma.user.findMany();
    
    res.status(200).json({ msg: "got the user", data: result });
  } catch (error) {
    res.status(400).json({ msg: error.message });
    console.log(error);
  }
};

const Login = async (req, res) => {
  let { email, password } = req.body;
  try {
    const result = await prisma.user.findUnique({
      where: { email },
    });
    if (result) {
      password = bcrypt.compare(password, result.password);
      if (password) {
        const token = AuthorizationToken(result);
        res.cookie("token", token)
        res.status(200).json({ msg: "successfully logged-in" });
      } else {
        res.status(404).json({ msg: "invalid email or password" });
      }
    }
    res.status(400).json({ msg: "user does not exist" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await prisma.user.delete({
      where: req.body,
    });
    res.status(200).json({ msg: "deleted the user", data: result });
  } catch (error) {
    res.status(400).json({ msg: error });
    console.log(error);
  }
};

module.exports = {
  createUser,
  getUser,
  deleteUser,
  Login
};
