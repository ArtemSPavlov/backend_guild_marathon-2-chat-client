import * as net from "net";

import { port, host } from "./config";

const socket = new net.Socket();

socket.setEncoding("utf8");
let counter = 0;

socket.on("data", data => {
  console.log(data.toString("utf8"));
})

socket.connect({
  port,
  host
}, () => {
  console.log("Connection open");
  socket.write("Тестовая комната");
  socket.write("Артем Павлов");
  setInterval(() => {
    if (counter < 10) {
      //socket.write("message ".repeat(counter));
      //socket.write("/history");
      socket.write("/users");
    };
    counter++;
  }, 1000)
  console.log({counter});
})
