const express = require("express");
const routerCartProducts = express.Router();

const DaoCartMongoDB = require("../daos/carts/DaoCartMongoDB.js");
const cartMongoDB = new DaoCartMongoDB();

const DaoProductsMongo = require("../daos/products/DaoProductsMongoDB.js");
const productMongo = new DaoProductsMongo();

//MONGO Atlas Carrito + productos -----------------------------------------------//

routerCartProducts.post("/:id/:idProd", async (req, res) => {
  const cart = await cartMongoDB.getById(req.params.id);
  const product = await productMongo.getById(req.params.idProd);

  if (
    product._id.valueOf() === req.params.idProd &&
    cart._id.valueOf() === req.params.id
  ) {
    cart.products.push(product);
    await cartMongoDB.updateById(req.params.id, cart);
    res.status(201).send(`Producto enviado al carrito`);
  } else {
    res.status(404).json({ error: `El elemento no existe` });
  }
});

routerCartProducts.delete("/:id/:idProd", async (req, res) => {
  const cart = await cartMongoDB.getById(req.params.id);

  const prodIndex = cart.products.findIndex(
    (p) => p._id.valueOf() === req.params.idProd
  );

  if (prodIndex !== -1) {
    cart.products.splice(prodIndex, 1);
    await cartMongoDB.updateById(req.params.id, cart);
    res.status(200).send(`Producto eliminado del carrito`);
  } else {
    res.status(404).json({ error: `El elemento a eliminar no existe` });
  }
  //Arreglado: ahora puede eliminar y actualizar la db
});

module.exports = routerCartProducts;
