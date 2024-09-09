const WebSocketServer = require('ws').WebSocketServer;
const si = require("systeminformation");
const wss = new WebSocketServer({ port: 8080 });

// wss.on("connection", function connection(ws) {
//   ws.on("message", function message(data) {
//     console.log("received: %s", data);
//   });
//   ws.send("something");
// });

wss.on("connection", function connection(ws) {
  // Send an initial message when a client connects
  ws.send("Connected to WebSocket server");

  // Set up an interval to send the CPU load data every second
  const intervalId = setInterval(async () => {
    try {
      const cpuTemp = JSON.stringify(await si.currentLoad());
      ws.send(cpuTemp); // Send CPU load data to the WebSocket client
    } catch (error) {
      console.error('Error fetching CPU load:', error);
    }
  }, 1000);

  // Handle the case when the client disconnects
  ws.on("close", () => {
    clearInterval(intervalId); // Clear the interval when the connection is closed
    console.log("Client disconnected, stopping CPU load reporting.");
  });

  // Handle incoming messages from the client
  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });
});
