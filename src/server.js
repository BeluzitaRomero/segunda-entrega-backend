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
    saveUninitialized: false,
    // // cookie: {
    // //   maxAge: 3000,
    // // },
  })
);

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  req.session.user = req.body;
  res.render("home", { data: [req.session.user] });
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) res.status(200).send("Logout ok");
    else res.json(err);
  });
});

// ----Config router PRODUCTOS, CARRIO, CARRITO+PRODUCTOS
const routerCart = require("./routes/cartRoutesMongoDB");
const routerProducts = require("./routes/productRoutesMongoDB");
const routerCartProducts = require("./routes/cartProductsRoutesMongoDB");

app.use("/api/products", routerProducts);
app.use("/api/cart", routerCart);
app.use("/api/cart/products", routerCartProducts);

module.exports = app;
