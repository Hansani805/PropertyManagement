const express = require("express");

const router = express.Router();

const propertyController = require("../controllers/property");

router.post("/", propertyController.addProperty);

router.get("/", propertyController.getAllProperties);

router.get("/:id", propertyController.getProperty);

module.exports = router;
