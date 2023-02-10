import express from "express";
import Message from "./message";
import type User from "./user";

// users is my in-memory array im PRETENDING is a database, that stores users.
// it will be wiped every time i restart the script, because its only in this file, its
// not a real database yet.
// but now i can PUSH to it, and GET elements OUT of it. so it pretends to be a database.
const users: User[] = [];
const messages: Message[] = [];
let messageId: number = 0;
const app = express();
app.use(express.json());



app.get("/", function (req, res){
  res.send("Hello World");
})

app.get("/user/:name", function (req, res){
  const user = users.find((u) => u.name === req.params.name);
  if (user) {
    res.send(user);
  } else {
    res.send({});
  }

});

app.post("/user", function (req, res){


  console.log(req.body);
  const user: User = {
    name: req.body.name,
    isAdmin: req.body.isAdmin,
    roles: req.body.roles,
    createdAt: new Date().toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })

  };
  console.log("user", user);

  users.push(user);
  res.send(user);

});

app.post("/messages", function (req, res){
  const message: Message = {
    userName: req.body.userName,
    messageText: req.body.messageText,
    keks: req.body.keks,
    messageId: ++messageId,
  };

  messages.push(message);
  res.send(message);

});

app.put("/message/:id", function (req, res) {
  
  const messageId = Number(req.params.id);
  const newMessage = req.body.newMessage;

  // Find the message by its ID
  const messageIndex = messages.findIndex(message => message.messageId == messageId);
  console.log(messageIndex);



  // Update the message text
  messages[messageIndex].messageText = newMessage;

  // Return the updated message
  res.send(messages[messageIndex]);
});

app.get("/messages", function (req, res){
  const allMessages = messages;
  
})

app.get("/messages/:name", function (req, res){
  const userName = req.params.name;
  console.log(messages);
  

  const userMessages = messages.filter(message => message.userName === userName);
  res.send(userMessages);
})



app.listen(3001);
