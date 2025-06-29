const express = require('express')
const addtocart = require('../controllers/cart/addtocart')
const addtocartlist = require('../controllers/cart/addtocartlist')
const addtocartdelete = require('../controllers/cart/addtocartdelete')
const cartlist = require('../controllers/cart/cartlist')
const authenticateToken = require('../middlewares/verifytoken')
const updateCartQuantity = require('../controllers/cart/frontend/updateCartQuantity')
const cartcount = require('../controllers/cart/frontend/cartcount')
const checkuser = require('../middlewares/checkuser')
const router = express.Router()

router.post('/',authenticateToken,addtocart)
router.get('/',cartlist)
router.get('/addtocartlist',checkuser,addtocartlist)
router.get('/cartcount',checkuser,cartcount)
router.post('/updateqty',authenticateToken,updateCartQuantity)
router.delete('/:cart_id',addtocartdelete)

module.exports = router