const app = require("express")();
const server = require("http").Server(app);

const io = require("socket.io")(server, { cors: { origin: "*" } });

const next = require("next");

const dev = process.env.NODE_ENV !== "production";

const nextApp = next({ dev });

const nextHandler = nextApp.getRequestHandler();

let port = 3000;
let questionIndex = 0;

function chatBot(query) {
  if (questionIndex == 0) {
    questionIndex += 1;
    return "hello freind! How are you ?";
  } else if (questionIndex == 1) {
    questionIndex += 1;
    return "where are you from?";
  }
  else if(questionIndex==2)
   {
       questionIndex+=1;
       return 'Would you like to learn about cyber bullying?'

   }
   else if(questionIndex==3 && query.toLowerCase().includes("no")) {
       questionIndex++;
       return 'ok nice meeting you :)'
   }
   else if(questionIndex==3 && query.toLowerCase().includes("yes")) {
    questionIndex++;
    return 'lets get going'
}

return "wait for sometime i am thinking ."
   
}

io.on("connect", (socket) => {
  socket.emit("now", { message: "welcome Lets start chatting?" });
  socket.on("user-query-text", (data) => {
    console.log(socket.id);
    const response = chatBot(data.text);
    console.log(response);
    socket.emit("chat-bot-reply", { text: response });
  });
});

nextApp.prepare().then(() => {
  app.get("*", (req, res) => nextHandler(req, res));
  server.listen(port);
});
