const cookieSession = require("cookie-session");
const session = require('express-session');
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const app = express();
const port=5000;
app.use(
  cookieSession({ name: "session", keys: ["sudarmani"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(session({
  secret: 'sudar',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Change to true if you're using HTTPS
}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`Server is running ${port}`);
});