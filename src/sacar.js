//MONGO Atlas PRODUCTOS ----------------------------------------------------------------//
//READ
routerProducts.get("/", async (req, res) => {
  const productos = await productMongo.getAll();
  res.send(productos);
});

// //READ ID
routerProducts.get("/:id", async (req, res) => {
  const productos = await productMongo.getById(req.params.id);
  res.send(productos);
});

// //CREATE
routerProducts.post("/", async (req, res) => {
  console.log(req.body);
  res.json(await productMongo.save(req.body));
});

// //UPDATE
routerProducts.put("/:id", async (req, res) => {
  console.log(req.body);
  res.json(await productMongo.updateById(req.params.id, req.body));
});

// //DELETE ID
routerProducts.delete("/:id", async (req, res) => {
  console.log(req.body);
  res.json(await productMongo.deleteById(req.params.id));
});
// //DELETE ALL
routerProducts.delete("/", async (req, res) => {
  console.log(req.body);
  res.json(await productMongo.delete());
});

// //MONGO Atlas CARRITO----------------------------------------------------------------------//

// //READ
routerCart.get("/", async (req, res) => {
  const carts = await cartMongoDB.getAll();
  res.send(carts);
});

routerCart.get("/:id", async (req, res) => {
  const carts = await cartMongoDB.getById(req.params.id);
  res.send(carts);
});

// //CREATE // Crea carrito vacio
routerCart.post("/", async (req, res) => {
  res.send(await cartMongoDB.save({ products: [] }));
});

// //DELETE
routerCart.delete("/:id", async (req, res) => {
  res.json(await cartMongoDB.deleteById(req.params.id));
});

// //MONGO Atlas CARRITO + PRODUCTOS -----------------------------------------------//
// //
routerCart.get("/:id/products", async (req, res) => {
  const cart = await cartMongoDB.getById(req.params.id);

  const product = await productMongo.getById(req.body._id);

  if (product._id.valueOf() === req.body._id) {
    cart.products.push(product);

    await cartMongoDB.updateById(req.params.id, cart);
    res.send(`Producto enviado al carrito`);
  }
});

routerCart.delete("/:id/products/:idProd", async (req, res) => {
  const cart = await cartMongoDB.getById(req.params.id);
  const prodIndex = cart.products.findIndex(
    (p) => p._id.valueOf() === req.params.idProd
  );
  if (prodIndex !== -1) {
    cart.products.splice(prodIndex, 1);
    await cartMongoDB.updateById(req.params.id, cart);
    res.send(`Producto eliminado del carrito`);
  } else {
    res.send(`El producto a eliminar no existe`);
  }

  //Arreglado: ahora puede eliminar y actualizar la db
});
