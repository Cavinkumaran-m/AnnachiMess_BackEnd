const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoDBSession = require("connect-mongodb-session")(session);
const Route = require("./Routes/CustomerRoutes");
const cors = require("cors");
const app = express();
const crypt = require("bcrypt");
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST"],
  })
);

// Database Connection
const uri =
  "mongodb+srv://cavinkumaran1257:CAVIN1981@maincluster.ybeixlr.mongodb.net/annachi_mess?retryWrites=true&w=majority";

// const uri = "mongodb://localhost:27017/Annachi";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// Session Handling
const Store = new mongoDBSession({
  uri: uri,
  collection: "AnnachiSessions",
});

app.use(
  session({
    secret: "secretKeyForCavinSession12345",
    resave: false,
    saveUninitialized: false,
    store: Store,
    cookie: {
      expires: 1000 * 60 * 30,
    },
  })
);

app.use("/", Route);

app.get("status", (req, res) => {
  res.send("API version 1.01");
});

app.listen(process.env.PORT || 80, () => {
  console.log("Server live and running @ " + process.env.PORT + " & " + 80);
});
