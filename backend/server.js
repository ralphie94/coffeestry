const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

require("./db/db");

const usersRouter = require("./routes/users");
const coffeeRouter = require("./routes/coffee");
const ordersRouter = require("./routes/orders");

const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
    app.use(express.static("build"));
}

app.use(express.static(__dirname));
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); 
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger("dev"));
app.use(session({
    secret: "she's my moomoo, she's my moomoo",
    resave: false,
    saveUninitialized: true
}));

app.use("/users", usersRouter);
app.use("/coffee", coffeeRouter);
app.use("/orders", ordersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;