const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.listen(port, async () => {
  try {
    console.log("===>>> Server started successfully on port:", port);
  } catch (error) {
    console.log("===>>> Server Starting error:", error.message);
  }
});
