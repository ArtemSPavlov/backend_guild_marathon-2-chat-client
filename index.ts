import * as net from "net";
import * as readline from "readline";

import { port, host } from "./config";

const socket = new net.Socket();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "\x1b[1;31m" + ">> " + "\x1b[0m"
})

socket.connect({
  port,
  host
}, () => {
  console.log("\nConnection open");
})

socket.on("data", data => {
  console.log("\x1b[0G", data.toString("utf8"));
  rl.prompt(true);
})

socket.on("close", () => {
  console.log("\nConnection close");
  process.exit(0);
})

socket.on("error", () => {
  console.log("\nConnection error");
  process.exit(1);
})

rl.on("line", line => {
  socket.write(line.trim());
})

rl.on("close", () => {
  console.log("\nConnection close");
  process.exit(0);
})
