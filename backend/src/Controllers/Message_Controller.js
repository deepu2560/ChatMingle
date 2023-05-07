const express = require("express");

const MessageModel = require("../Models/Message_Models");

const router = express.Router();

router.get("/get/:id", async (req, res) => {
  try {
    const message = await MessageModel.find({ chatId: req.params.id });

    res.status(200).send({ message });
  } catch (error) {
    console.log(`getting messages server error: ${error}`);
    res.status(500).send({ error });
  }
});

module.exports = router;
