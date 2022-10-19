const express = require("express");
const { getAllProducts } = require("../controllers/products");
const { getAllProductsStatic } = require("../controllers/products");
const router = express.Router();

router.route("/static").get(getAllProductsStatic);
router.route("/").get(getAllProducts);
module.exports = router;
