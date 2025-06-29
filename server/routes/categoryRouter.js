const express=require("express")
const createcategory = require("../controllers/Productcategory/createcategory")
const upload = require("../middlewares/image-uploader")
const categorylist = require("../controllers/Productcategory/categorylist")
const categorylistlevelone = require("../controllers/Productcategory/category_level_one")
const categorysingle = require("../controllers/Productcategory/categorysingle")
const deletecategory = require("../controllers/Productcategory/deletecategory")
const updatecategory = require("../controllers/Productcategory/updatecategory")
const frontendcategorylist = require("../controllers/Productcategory/frontend_category_list")
const routercategory=express.Router()

routercategory.post("/",upload.fields(
    [
        {
            name: "category_image",
            maxCount: 1,
        },
    ]
),createcategory)
routercategory.get("/",categorylist)
routercategory.get("/levelone",categorylistlevelone)
routercategory.get("/frontendcategorylist",frontendcategorylist)
routercategory.get("/:id",categorysingle)
routercategory.delete("/:id",deletecategory)
routercategory.patch("/:id",upload.fields(
    [
        {
            name: "category_image",
            maxCount: 1,
        },
    ]
),updatecategory)

module.exports=routercategory