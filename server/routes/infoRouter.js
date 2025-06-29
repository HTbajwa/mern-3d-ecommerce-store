const express=require('express')
const router=express.Router()
const upload = require('../middlewares/image-uploader');
const contactlist = require('../controllers/info/contactlist');
const contactus = require('../controllers/info/contactus');
const webinfo = require('../controllers/info/webinfo');
const editwebinfo = require('../controllers/info/editwebinfo');
const getwebinfo = require('../controllers/info/getwebinfo');
const deletecontact=require('../controllers/info/deletecontact')
router.get('/contactus',contactlist)
router.post('/contactus',upload.none(),contactus)
router.post('/websiteinfo',upload.fields([
    { name: 'logo', maxCount: 1 },
  ]),webinfo);
router.patch('/websiteinfo',upload.fields([
    { name: 'logo', maxCount: 1 },
  ]),editwebinfo);
  router.get('/websiteinfo',getwebinfo);
  router.delete('/:id',deletecontact)
module.exports=router
