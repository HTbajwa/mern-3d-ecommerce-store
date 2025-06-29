const express = require('express')
const router = express.Router()
const upload = require('../middlewares/image-uploader.js');
const createbanner = require('../controllers/banner/createbanner.js');
const bannerlist = require('../controllers/banner/bannerlist.js');
const bannersingle = require('../controllers/banner/bannersingle.js');
const deletebanner = require('../controllers/banner/deletebanner.js');
const updatebanner = require('../controllers/banner/updatebanner.js');

router.post('/',upload.fields([
    { name: 'banner', maxCount: 1 },
  ]),createbanner);
router.get('/',bannerlist);
router.get('/:id',bannersingle);
router.delete('/:id',deletebanner);
router.patch('/:id',upload.fields([
    { name: 'banner', maxCount: 1 },
  ]),updatebanner);
module.exports = router