const express = require("express");
const router = express.Router();
const upload = require("../middlewares/image-uploader");
const createvariant = require("../controllers/ProductVarient/createvariant.js");
const updateproductvariant = require("../controllers/ProductVarient/updateproductvarient.js");
const singleproductvariant = require("../controllers/ProductVarient/singleproductvarient.js");
const deleteproductvariant = require("../controllers/ProductVarient/deletecategory");
const productvariantlist = require("../controllers/ProductVarient/productvarientList.js");
const frontend_singleproduct = require("../controllers/ProductVarient/frontend/frontend_singleproduct.js");
const frontend_singleproductvariant = require("../controllers/ProductVarient/frontend/frontend_singleproductvariant.js");

router.post(
  "/",
  upload.fields([
    { name: "product_image1", maxCount: 1 },
    { name: "product_image2", maxCount: 1 },
    { name: "product_image3", maxCount: 1 },
    { name: "product_image4", maxCount: 1 },
  ]),
  createvariant
);
router.patch(
  "/:id",
  upload.fields([
    { name: "product_image1", maxCount: 1 },
    { name: "product_image2", maxCount: 1 },
    { name: "product_image3", maxCount: 1 },
    { name: "product_image4", maxCount: 1 },
  ]),
  updateproductvariant
);
router.get("/id/:id", productvariantlist);
router.get("/:id", singleproductvariant);
router.get('/detail/:id',frontend_singleproduct)
router.get('/:parentid/:attr/:attrvalue',frontend_singleproductvariant)
router.delete("/:id", deleteproductvariant);

module.exports = router;