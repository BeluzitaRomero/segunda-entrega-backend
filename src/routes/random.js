const express = require("express");
const random = express.Router();

const { fork } = require("child_process");

random.get("/:cant?", (req, res) => {
  const { cant } = req.query;

  let calc = fork("./src/utils/calculoRandom.js");
  calc.send(cant);

  //recibir/escuchar el mensaje de child
  calc.on("message", (result) => {
    console.log(result);
    res.send(result);
  });
});

module.exports = random;
