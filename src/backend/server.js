const express = require("express");
const app = express();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const userRouter = require("./routes/users");

// Constants
const {
  HOST,
  PORT,
  SESS_SECRET,
  NODE_ENV,
  IS_PROD,
  COOKIE_NAME,
  MONGO_URI
} = require("./config/config.js");
const MAX_AGE = 1000 * 60 * 60 * 3; 

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true
})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const mongoDBStore = new MongoDBStore({
  uri: MONGO_URI,
  collection: "mySessions"
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(
//   session({
//     name: COOKIE_NAME,
//     secret: SESS_SECRET,
//     resave: true,
//     saveUninitialized: true,
//     store: mongoDBStore,
//     cookie: {
//       maxAge: MAX_AGE,
//       sameSite: false,
//       secure: IS_PROD
//     }
//   })
// );

app.get("/", (req, res) => {
  res.send({status: "bunger"});
});
app.use(userRouter);
app.listen(PORT, () => console.log(`Server started on http://${HOST}:${PORT}`));