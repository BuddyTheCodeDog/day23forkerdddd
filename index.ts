import express from "express";
import type User from "./user";

// users is my in-memory array im PRETENDING is a database, that stores users.
// it will be wiped every time i restart the script, because its only in this file, its
// not a real database yet.
// but now i can PUSH to it, and GET elements OUT of it. so it pretends to be a database.
const users: User[] = [];
const app = express();
app.use(express.json());

app.get("/user/:name", function (req, res) {
  // now, i want to the user to provide me a NAME. and i will try to FIND that user by name in my
  // "database", the users array.
  const user = users.find((u) => u.name === req.params.name);
  if (user) {
    res.send(user);
  } else {
    res.send({});
  }
});

// POST requests send data to the backend to be saved. this is semantic route naming. POST.
// for this route, we want to check the `req` object for a users name, isadmin, and roles. then create a new user.
// the user can be fetched by name in the GET route above.
// we want to send in a JSON object, which means Javascript Object Notation, which is really long stupid name
// for a javascript object. so like
// {name: "Horsey", isAdmin: false, roles: ["kekman"]}
app.post("/user", function (req, res) {
  // req.body is our incoming javascript object, with the user information that the person calling this route
  // wants to save.
  const user: User = {
    name: req.body.name,
    isAdmin: req.body.isAdmin,
    roles: req.body.roles,
  };

  // on POSTING the data in req.body, and saving it as a user, i PUSH it to my users array. now, on my GET route, i can
  // get it out out of the "database" of the users array!
  users.push(user);

  res.send(user);
});

app.listen(3001);
