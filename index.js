const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config");
require("./startup/validation")();

//image upload -> s3
//push notifications
//verification of email by sending an email

const port = process.env.PORT || 3000;
app.listen(port, () => {
  winston.info(`listening on Port ${port}..`);
});
