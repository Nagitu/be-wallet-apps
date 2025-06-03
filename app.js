const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const { User, Transaction, Source } = require("./models");
const app = express();
app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/transactions", async (req, res) => {
  try {
    const users = await Transaction.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/sources", async (req, res) => {
  try {
    const users = await Source.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name", "email"],
        },
      ],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("3000");
});
