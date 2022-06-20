const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
//desafio 16
const compression = require("compression");
app.use(compression());

const session = require("express-session");
const mongoStore = require("connect-mongo");

const passport = require("./utils/passport.util");
const LocalStrategy = require("passport-local").Strategy;

//EJS
app.set("view engine", "ejs");
app.set("views", "src/views");

//Config del servidor middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/******************************SESSION***********************************/
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
      maxAge: Number(process.env.EXPIRE),
    },
    rolling: true,
  })
);

/******************************PASSPORT***********************************/
app.use(passport.initialize());
app.use(passport.session());

// ----Config router PRODUCTOS, CARRIO, CARRITO+PRODUCTOS
const routerCart = require("./routes/cartRoutesMongoDB.js");
const routerProducts = require("./routes/productRoutesMongoDB.js");
const routerCartProducts = require("./routes/cartProductsRoutesMongoDB.js");
// const routerUser = require("./routes/user");
const authRouter = require("./routes/auth.router");

//desafio 14***************************
const infoRouter = require("./routes/infoRouter.js");
const random = require("./routes/random.js");

app.use("/api/products", routerProducts);
app.use("/api/cart", routerCart);
app.use("/api/cart/products", routerCartProducts);
// app.use("/api/user", routerUser);
app.use("/api/user", authRouter);

//desafio 14***********************
app.use("/info", infoRouter);
app.use("/api/random", random);

module.exports = app;
