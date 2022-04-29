//----config router CARRITO
const express = require("express");
const routerCart = express.Router();
const DaoCartMongoDB = require("../daos/carts/DaoCartMongoDB");
const cartMongoDB = new DaoCartMongoDB();

const admin = true;

//READ
routerCart.get("/", async (req, res) => {
  const carts = await cartMongoDB.getAll();
  res.status(200).send(carts);
});

routerCart.get("/:id", async (req, res) => {
  const carts = await cartMongoDB.getById(req.params.id);
  if (!carts) {
    res.status(404).json({ error: `El elemento no existe` });
  } else {
    res.status(201).send(carts);
  }
});

//CREATE // Crea carrito vacio
routerCart.post("/", async (req, res) => {
  res.status(201).send(await cartMongoDB.save({ products: [] }));
});

//DELETE
routerCart.delete("/:id", async (req, res) => {
  if (!admin) {
    res.status(400).json({ error: `error 400, metodo delete: no autorizado` });
  } else {
    res.status(200).json(await cartMongoDB.deleteById(req.params.id));
  }
});

module.exports = routerCart;
