const app = require("express")();
const server = require("http").Server(app);

const io = require("socket.io")(server, {cors:{origin:"*"}});

const next = require("next");

const dev = process.env.NODE_ENV !== "production";

const nextApp = next({ dev });

const nextHandler = nextApp.getRequestHandler();

let port = 3000;

function chatBot(query) {
  return "this is chat bot response w regards to "+ query;
}

io.on("connect", (socket) => {
    socket.emit("now", { message: "welcome Lets start chatting?" });
    socket.on("user-query-text", (data) => {
    console.log(socket.id)
    const response = chatBot(data.text);
    console.log(response)
    socket.emit("chat-bot-reply", { text: response });
  });
});

nextApp.prepare().then(() => {
  app.get("*", (req, res) => nextHandler(req, res));
  server.listen(port);
});
