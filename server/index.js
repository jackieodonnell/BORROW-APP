const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const app = express();
const { pool } = require("./database/queries");
const jwt = require("jsonwebtoken");
const { getLoansByUsername, getUserByUsername } = require("./utils/db");
const { adminControl } = require("./controllers/admin");

// MIDDLEWARES
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/build")));

// ROUTES
const validate = require("./routes/validate");
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const searchRoute = require("./routes/search");
const createLoanRoute = require("./routes/create_loan");
const updateLoanRoute = require("./routes/update_loan");
const refetchRoute = require("./routes/refetch");

// PERSONAL MIDDLEWARES
app.use("/", validate);
app.use("/", loginRoute);
app.use("/", registerRoute);
app.use("/", searchRoute);
app.use("/", createLoanRoute);
app.use("/", updateLoanRoute);
app.use("/", refetchRoute);
// app.use("/", adminRoute);

// ADMIN ROUTE

app.get("/api/v1/data/admin", adminControl);

// UNIVERSAL ROUTE
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// Export APP

module.exports = app;
