const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createItem = async (req, res) => {
  console.log(req.body);

  const userId = req.user_id;
  const data = { ...req.body, userId };
  try {
    if (
      prisma.user.findUnique({
        where: { userId },
      })
    ) {
      const result = await prisma.item.create({
        data,
      });
      res.status(200).json({
        msg: "successfully added item for user",
        result,
      });
    } else {
      res.status(404).json({ smg: "user does not exist " });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: "Bad request", error });
  }
};

const getItem = async (req, res) => {
  // console.log(req.user_id)
  // console.log("coming");

  try {
    const userId = req.user_id;
    console.log(userId);
    const resp = await prisma.item.findMany({ where: { userId } });
    // console.log("coming2", resp);

    res.status(200).json({ smg: "succesfull", data: resp });
    console.log("coming3");
  } catch (error) {
    res.status(400).json({ msg: "Bad request", error });
    console.log(error);
  }
};

const deleteItem = async (req, res) => {
  console.log(req.body);
  try {
    const ress = await prisma.item.delete({
      where: req.body,
    });
    res.status(200).json({ smg: "succesfull", data: ress });
  } catch (error) {
    res.status(400).json({ msg: "Bad request", error });
    console.log(error);
  }
};

module.exports = {
  createItem,
  getItem,
  deleteItem,
};
