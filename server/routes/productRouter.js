const express=require("express")
const productlist = require("../controllers/Product/productlist")
const upload = require("../middlewares/image-uploader")
const createproduct = require("../controllers/Product/createproduct")
const updateproduct = require("../controllers/Product/updateproduct")
const singleproduct = require("../controllers/Product/singleproduct")
const deleteproduct = require("../controllers/Product/deleteproduct")
const frontendproductlistbycategory = require('../controllers/Product/frontend/frontend_productlist_bycategory');
const searchitem = require('../controllers/Product/frontend/frontend_serach');
const checkuser = require('../middlewares/checkuser.js');
const modelUpload = require("../middlewares/modelUpload");

const frontend_singleproduct = require('../controllers/Product/frontend/frontend_singleproduct');
const router=express.Router()

router.post(
  '/',
  upload.fields([
    { name: 'product_image1', maxCount: 1 },
    { name: 'product_image2', maxCount: 1 },
    { name: 'product_image3', maxCount: 1 },
    { name: 'product_image4', maxCount: 1 },
    { name: 'model3D', maxCount: 1 } // <-- add this here
  ]),
  createproduct
);
  router.patch('/:id',upload.fields([
    { name: 'product_image1', maxCount: 1 },
    { name: 'product_image2', maxCount: 1 },
    { name: 'product_image3', maxCount: 1 },
    { name: 'product_image4', maxCount: 1 },
    { name: 'model3D', maxCount: 1 }
  ]),updateproduct)
router.get('/',productlist)
router.get('/search/:name',searchitem)
router.get('/:id',singleproduct)
router.delete('/:id',deleteproduct)

  router.get('/product-by-category/:id',frontendproductlistbycategory)
  router.get('/product-detail/:id',checkuser,frontend_singleproduct)

module.exports=router