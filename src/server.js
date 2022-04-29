const express = require("express");
const app = express();

// ----Config router PRODUCTOS, CARRIO, CARRITO+PRODUCTOS
const routerCart = require("./routes/cartRoutesMongoDB");
const routerProducts = require("./routes/productRoutesMongoDB");
const routerCartProducts = require("./routes/cartProductsRoutesMongoDB");

app.use("/api/products", routerProducts);
app.use("/api/cart", routerCart);
app.use("/api/cart/products", routerCartProducts);

//Config del servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

module.exports = app;
