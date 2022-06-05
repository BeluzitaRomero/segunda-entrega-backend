const express = require("express");
const infoRouter = express.Router();

//Desafio 15
const numCPUs = require("os").cpus().length;

const yargs = require("yargs/yargs")(process.argv.slice(2));

const info = {
  argsInput: yargs.argv,
  SO: process.platform,
  version: process.version,
  reserverdMemory: process.memoryUsage(),
  executionPath: process.execPath.split("\\").pop(),
  pid: process.pid,
  folder: process.cwd(),
  numCpu: numCPUs,
};

console.log(info);

infoRouter.get("/", (req, res) => {
  res.send(info);
});

module.exports = infoRouter;
