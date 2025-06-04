const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const { User, Transaction, Source, Category } = require("./models");
const cors = require("cors");
const app = express();
app.use(cors());

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
app.get("/categories", async (req, res) => {
  try {
    const users = await Category.findAll({
      // include: [
      //   {
      //     model: User,
      //     as: "user",
      //     attributes: ["name", "email"],
      //   },
      // ],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/categories", async (req, res) => {
  const { title, type } = req.body;

  if (!title || !type) {
    return res.status(400).json({
      status: false,
      message: "Title and type are required",
    });
  }

  try {
    const exists = await Category.findOne({ where: { title, type } });

    if (exists) {
      return res.status(409).json({
        status: false,
        message: "Category with same title and type already exists",
      });
    }

    const category = await Category.create({ title, type });

    return res.status(201).json({
      status: true,
      message: "Category created",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("3000");
});
