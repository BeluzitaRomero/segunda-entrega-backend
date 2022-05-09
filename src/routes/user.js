const express = require("express");
const routerUser = express.Router();
const auth = require("../middlewares/auth.middleware");

routerUser.get("/login", (req, res) => {
  if (req.session.login) {
    res.redirect("/api/user/login");
  } else {
    res.render("login", { status: false });
  }
  //   res.render("login");
});

routerUser.post("/login", (req, res) => {
  req.session.user = req.body;
  console.log(req.session.user, "req.session.user");
  if (req.session.user.user === "belen") {
    req.session.login = true;
    res.redirect("/api/user");
  } else {
    req.session.login = false;
    res.redirect("/api/user");
    console.log("post else");
    //Asi veo como funciona auth
    //cuando no es belen, no me autoriza a entrar
  }
});

routerUser.get("/", auth, (req, res) => {
  console.log(req.session.user);
  res.render("home", {
    ststus: req.session.login,
    user: [req.session.user],
  });
});

routerUser.get("/logout", (req, res) => {
  console.log(req.session.user);
  req.session.destroy((err) => {
    if (!err) res.status(200).render("login");
    else res.json(err);
  });
});

module.exports = routerUser;
