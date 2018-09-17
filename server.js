const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const app = express();
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

//DB Config
const { mongoURI } = require("./config/key.json");
//Connect do mongoDB
mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
app.get("/", (req, res) => res.send("Hello"));

//bodyParser config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Use routes

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
