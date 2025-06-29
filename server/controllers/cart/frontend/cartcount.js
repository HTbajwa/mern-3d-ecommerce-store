
const cart = require("../../../Models/cart");

const cartcount = async (req, res) => {
  try {
    console.log("Decoded User:", req.user); // ← Add this line
    const user_id = req.user.id;

    const userCart = await cart.find({ user_id, orderstatus: "add to cart" });
    if (!userCart || userCart.length === 0) {
      return res.status(404).json({ status: 0, message: "User cart is Empty" });
    }

    let totalItems = 0;
    userCart.forEach((cartItem) => {
      totalItems += cartItem.product_qty;
    });

    res.status(200).send({ status: 1, totalItems });
  } catch (error) {
    console.error("Error in cartcount:", error); // Helpful error log
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = cartcount;

