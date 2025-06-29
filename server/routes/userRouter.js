const express = require("express");
const userlist = require("../controllers/user/userlist");
const register = require("../controllers/user/register");
const login = require("../controllers/user/login");
const usersingle = require("../controllers/user/usersingle");
const updateuser = require("../controllers/user/updateuser");
const Authenticationtoken = require("../middlewares/verifytoken");
const deleteuser = require("../controllers/user/deleteuser");
const frontenduser = require("../controllers/user/frontened/frontend_usersingle");
const usercount = require("../controllers/user/usercount");

const router = express.Router();

router.get("/", userlist);
router.get("/userinfo",Authenticationtoken,frontenduser)
router.get("/:id", usersingle); 

router.post("/register", register); 
router.post("/login", login); 
router.patch("/:id", Authenticationtoken, updateuser); 
router.delete('/:id',deleteuser)
router.get("/usercount", usercount);
module.exports = router;


