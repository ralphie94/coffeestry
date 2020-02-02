const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();

require("./db/db");

const usersRouter = require("./routes/users");
const coffeeRouter = require("./routes/coffee");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger("dev"));

app.use("/users", usersRouter);
app.use("/coffee", coffeeRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;