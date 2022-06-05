const express = require("express");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const app = express();

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    //worker (uno para cada nucleo)
    cluster.fork(); // creacion de subproceso
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Process ${process.pid} died`);
  });
} else {
  const app = express();

  //   app.get("/", (req, res) => {
  //     res.send(`Hola mundo ${process.pid}`);
  //   });

  app.listen(4002, () => {
    console.log(`Server ${process.pid} http://localhost:4002`);
  });
}
