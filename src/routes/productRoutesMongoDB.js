//----Config router productos
const express = require("express");
const routerProducts = express.Router();
const logger = require("../utils/logger.js");

const auth = require("../middlewares/auth.middleware.js");

const DaoProductsMongo = require("../daos/products/DaoProductsMongoDB.js");
const productMongo = new DaoProductsMongo();

// require("dotenv").config();
// const admin = process.env.ADMIN;
const admin = true;

//MONGO Atlas Productos ----------------------------------------------------------------//
//READ ------------Ya tiene vista
routerProducts.get("/", async (req, res) => {
  const products = await productMongo.getAll();
  res.render("products", { data: products });
  logger.info("Get - Get products");
});

// Ya tiene vista
routerProducts.get("/save", auth, async (req, res) => {
  res.render("saveProducts");
  logger.info("Get - Save products");
}); //PUSE EL AUTH PARA VER SI ME RESTRINGE EL ACCESO

//READ ID  ----------ya tiene vista
routerProducts.get("/:id", async (req, res) => {
  const product = await productMongo.getById(req.params.id);

  if (!product) {
    res.status(404).json({ error: `El elemento no existe` });
    logger.error("Get - Product doesn't exist");
  } else {
    res.status(200).render("products", { data: [product] });
    logger.info(`Get - Product ${id}`);
    //Le meti un array xq la vista itera un array, despues veo si
    //sirve modificar el metodo desde la clase
  }
});

//CREATE -------------ya tiene vista
routerProducts.post("/", async (req, res) => {
  if (!admin) {
    res.status(403).json({ error: `error 400, metodo post: no autorizado` });
    logger.error("Post - You don't have permission to access");
  } else {
    await productMongo.save(req.body);
    res.status(201).redirect("/api/products");
    logger.info("Post - Saved product");
  }
});

//UPDATE
routerProducts.put("/:id", async (req, res) => {
  if (!admin) {
    res.status(403).json({ error: `error 400, metodo put: no autorizado` });
    logger.error("Put - You don't have permission to access");
  } else {
    console.log("req.body:", req.body);
    res
      .status(201)
      .json(await productMongo.updateById(req.params.id, req.body));
    logger.info("Put - Updated product");
  }
});

//DELETE ID
routerProducts.delete("/:id", async (req, res) => {
  if (!admin) {
    res.status(403).json({ error: `error 400, metodo delete: no autorizado` });
    logger.error("Delete - You don't have permission to access");
  } else {
    const idExists = await productMongo.getById(req.params.id);
    if (idExists) {
      res.status(200).json(await productMongo.deleteById(req.params.id));
      logger.info("Delete - Deleted product");
    } else {
      res.status(400).json({ error: `El id no existe` });
      logger.error("Delete - ID doesn't exist");
    }
  }
});
//DELETE ALL
routerProducts.delete("/", async (req, res) => {
  if (!admin) {
    res.status(403).json({ error: `error 403, metodo delete: no autorizado` });
    logger.error("Delete - Error 403");
  } else {
    res.status(200).json(await productMongo.delete());
    logger.info("Delete - Deleted products");
  }
});

module.exports = routerProducts;
