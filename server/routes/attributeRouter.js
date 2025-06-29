const express = require("express");
const router = express.Router();
const multer = require("multer");
const createattribute = require("../controllers/Attribute/createattribute.js");
const attributelist = require("../controllers/Attribute/attributelist.js");
const deleteattribute = require("../controllers/Attribute/deleteattribute.js");
const attribute_single = require("../controllers/Attribute/attribute_single.js");
const updateattribute = require("../controllers/Attribute/updateattribute.js");
const attribute_listing_by_categoryid = require("../controllers/Attribute/attribute_listing_by_categoryid.js");

const upload = multer();
router.get("/", attributelist);
router.patch('/:id',upload.none() ,updateattribute)
router.get('/:id',attribute_single)
router.get('/listbycategoryid/:id',attribute_listing_by_categoryid)
router.post("/", upload.none(), createattribute);
router.delete("/:id", deleteattribute);

module.exports = router;
