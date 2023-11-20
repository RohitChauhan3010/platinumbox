const mongoose = require("mongoose");
const { handleErrors } = require("../errorHandling/errorHandlers");
require("dotenv").config();

exports.connection = mongoose.connect(process.env.mongoUrl);
