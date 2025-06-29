const mongoose = require("mongoose");
const Usertable = require("../../Models/usertable");

const usersingle = async (req, res) => {
  try {
    const userid = req.params.id;

    // Validate if `userid` is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userid)) {
      return res.status(400).send({ error: "Invalid user ID format" });
    }

    // Query the database
    const userdetail = await Usertable.findById(userid);

    if (!userdetail) {
      return res.status(404).send({ error: "User details not found" });
    }

    return res.status(200).send({ status: "successfully", data: userdetail });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).send({
      error: "An error occurred while fetching user details",
      serverError: error.message,
    });
  }
};

module.exports = usersingle;
