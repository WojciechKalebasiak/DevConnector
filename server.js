const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const app = express();
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

//DB Config
const { mongoURI } = require("./config/key.json");
//Connect do mongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
app.get("/", (req, res) => res.send("Hello"));

//Use routes

app.use("/api/users", users);
// app.use("/api/profile", profile);
// app.use("/api/posts", posts);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
