const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const session = require("express-session");
const mongoStore = require("connect-mongo");

//EJS
app.set("view engine", "ejs");
app.set("views", "src/views");

//Config del servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//al objeto de config de session le puedo dar un tiempo de expiracion a traves de cookies
app.use(
  session({
    store: mongoStore.create({
      mongoUrl:
        "mongodb+srv://belen:chiste@clustercoder.cqdn9.mongodb.net/sesiones",
      options: {
        userNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000,
    },
    rolling: true,
  })
);

// ----Config router PRODUCTOS, CARRIO, CARRITO+PRODUCTOS
const routerCart = require("./routes/cartRoutesMongoDB");
const routerProducts = require("./routes/productRoutesMongoDB");
const routerCartProducts = require("./routes/cartProductsRoutesMongoDB");
const routerUser = require("./routes/user");

app.use("/api/products", routerProducts);
app.use("/api/cart", routerCart);
app.use("/api/cart/products", routerCartProducts);
app.use("/api/user", routerUser);

module.exports = app;
