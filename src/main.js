const app = require("./server");
const args = require("../yargs/yargs");

const PORT = args.port; //Puerto desde yargs

const numCPUs = require("os").cpus().length;
const cluster = require("cluster");

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    //worker (uno para cada nucleo)
    cluster.fork(); // creacion de subproceso
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Process ${process.pid} died`);
  });
} else {
  const server = app.listen(PORT, () => {
    console.log(
      `Servidor http escuchando en el puerto ${server.address().port}`
    );
  });

  server.on("error", (error) => {
    console.log(`Error en el servidor ${error}`);
  });
}
