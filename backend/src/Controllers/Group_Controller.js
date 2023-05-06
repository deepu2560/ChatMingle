const express = require("express");
const GroupModel = require("../Models/Group_Models");

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const group = await GroupModel.find();

    res.status(200).send({ group });
  } catch (error) {
    console.log(`Sending all groups data server errro: ${error}`);
    res.status(500).send({ error: "Something went wrong" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const group = await GroupModel.create(req.body);

    res.status(200).send({ group });
  } catch (error) {
    console.log(`creating new group data server errro: ${error}`);
    res.status(500).send({ error: "Something went wrong" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const group = GroupModel.findById(req.params.id);

    res.status(200).send({ group: "group deleted" });
  } catch (error) {
    console.log(`deleting a group data server errro: ${error}`);
    res.status(500).send({ error: "Something went wrong" });
  }
});

router.get("/request/get", async (req, res) => {
  try {
    const group = await GroupModel.find({ isRequest: true });

    res.status(200).send({ group });
  } catch (error) {
    console.log(`Get all request to delete a group server error: $${error}`);
    res.status(500).send({ error: "Something went wrong" });
  }
});

router.post("/request/delete", async (req, res) => {
  try {
    const group = await GroupModel.create(req.body);

    res.status(200).send({ group });
  } catch (error) {
    console.log(`Request to delete a group server error: $${error}`);
    res.status(500).send({ error: "Something went wrong" });
  }
});

module.exports = router;
