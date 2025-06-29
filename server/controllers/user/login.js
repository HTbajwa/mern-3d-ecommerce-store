const Usertable = require("../../Models/usertable");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const secretKey = "123456789";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Usertable.findOne({ email });
    const expiresInSeconds = 60 * 60 * 24 * 30; // 30 days in seconds

    if (!user) {
      return res.status(401).send({ message: "invalid credentials" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send({ message: "password not match" });
      } else {
        // Log current server time before generating the token
        console.log("🕒 Current Server Time (ISO format):", new Date().toISOString());

        // Generate the token
        const token = jwt.sign(
          { id: user._id }, 
          secretKey,
          { expiresIn: expiresInSeconds }
        );

        // Decode the token to get the expiration time
        const decodedToken = jwt.decode(token);

        console.log("✅ New JWT Token:", token);
        console.log("🕒 Expiration Timestamp:", decodedToken.exp); // Token expiration time
        
        return res.status(200).send({
          status: "successfull",
          message: "login successfull",
          token: token,
          user,
        });
      }
    }
  } catch (errors) {
    return res.status(500).send({
      status: "Failed",
      errors: errors.errors,
    });
  }
};

module.exports = login;
