const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const port = process.env.PORT || 5000;
const app = express();
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const path = require("path");

//DB Config
const { mongoURI } = require("./config/keys");
//Connect do mongoDB
mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
//Passport
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

//bodyParser config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Use routes

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
