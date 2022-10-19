const Product = require("../models/product.js");
const getAllProductsStatic = async (req, res) => {
  console.log(req.query);
  const products = await Product.find({ price: { $gt: 30 } }).sort("price");
  // .select("name price"); response will only have thesetwo properties
  res.status(200).json({ products, nbHits: products.length });
  if (!products) {
    throw new Error("Product doesnot exist");
  }
};
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured;
    featured == "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regx: name, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
  }
  let result = Product.find(queryObject);
  if (sort) {
    const sortlist = sort.split(",").join(" ");
    console.log(sortlist);
    result = result.sort(sortlist);
  } else {
    result.sort("createdAt");
  }
  const products = await result;
  res.status(200).json({ products });
};
module.exports = { getAllProductsStatic, getAllProducts };
