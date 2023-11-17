const express = require("express");
const subscribeController = require("../controllers/subscribeController"); 

const router = express.Router();

router.post("/subscribe", subscribeController);

module.exports = router;