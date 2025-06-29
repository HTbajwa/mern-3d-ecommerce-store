const Usertable = require("../../Models/usertable");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const secretKey="123456789";
const register = async (req, res) => {
  try {
    const { first_name, last_name, dob, email, mobile, password } = req.body;

    const salt = await bcrypt.genSalt(10);

    const bcrypt_password = await bcrypt.hash(password, salt);

    const createuser = new Usertable({
      first_name,
      last_name,
      dob,
      email,
      mobile,
      password: bcrypt_password,
    });
    const response = await createuser.save();
    const token = jwt.sign({ id: response.id }, secretKey, { expiresIn: '1h' });
    res.send({status:"successfull",data:response,token:token});
  } catch (errors) {
    res.send({ status: "failed", errors: errors });
    console.log("register error is here", errors);
  }
};

module.exports = register;
