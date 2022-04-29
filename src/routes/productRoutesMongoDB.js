//----Config router productos
const express = require("express");
const routerProducts = express.Router();

const DaoProductsMongo = require("../daos/products/DaoProductsMongoDB");
const productMongo = new DaoProductsMongo();

// require("dotenv").config();
// const admin = process.env.ADMIN;
const admin = true;

//MONGO Atlas Productos ----------------------------------------------------------------//
//READ
routerProducts.get("/", async (req, res) => {
  const products = await productMongo.getAll();
  res.send(products);
});

//READ ID
routerProducts.get("/:id", async (req, res) => {
  const product = await productMongo.getById(req.params.id);

  if (!product) {
    res.status(404).json({ error: `El elemento no existe` });
  } else {
    res.status(200).send(product);
  }
});

//CREATE
routerProducts.post("/", async (req, res) => {
  if (!admin) {
    res.status(403).json({ error: `error 400, metodo post: no autorizado` });
  } else {
    res.status(201).json(await productMongo.save(req.body));
    console.log(req.body);
  }
});

//UPDATE
routerProducts.put("/:id", async (req, res) => {
  if (!admin) {
    res.status(403).json({ error: `error 400, metodo put: no autorizado` });
  } else {
    console.log("req.body:", req.body);
    res
      .status(201)
      .json(await productMongo.updateById(req.params.id, req.body));
  }
});

//DELETE ID
routerProducts.delete("/:id", async (req, res) => {
  if (!admin) {
    res.status(403).json({ error: `error 400, metodo delete: no autorizado` });
  } else {
    res.status(200).json(await productMongo.deleteById(req.params.id));
  }
});
//DELETE ALL
routerProducts.delete("/", async (req, res) => {
  if (!admin) {
    res.status(403).json({ error: `error 400, metodo delete: no autorizado` });
  } else {
    res.status(200).json(await productMongo.delete());
  }
});

module.exports = routerProducts;
