const express = require("express");
const Usertable = require("../../Models/usertable");  // Adjust the path if needed
const router = express.Router();

// API to get the count of Admin and Customer users
const usercount = async (req, res) => {
  try {
    // Count the number of Admin users
    const adminCount = await Usertable.countDocuments({ isAdmin: "Active" });
    
    // Count the number of Customer users (users who are not admin)
    const customerCount = await Usertable.countDocuments({ isAdmin: "Inactive" });
    console.log('Admin Count:', adminCount);
    console.log('Customer Count:', customerCount);
    
    // Send the response with counts
    res.json({
      adminCount,
      customerCount
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = usercount;
