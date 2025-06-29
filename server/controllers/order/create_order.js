const order = require("../../Models/order");
const cart = require("../../Models/cart");
const sendEmail = require("../../middlewares/emailconfig");
const website_info = require("../../Models/website_info");
const { v4: uuidv4 } = require("uuid");

const createorder = async (req, res) => {
  try {
    const {
      shipping_first_name,
      shipping_last_name,
      shipping_address1,
      shipping_address2,
      shipping_country,
      shipping_state,
      shipping_city,
      shipping_pincode,
      shipping_mobile,
      shipping_email,
      total_amount,
      payment_method,
      payment_status,
      payment_key,
      shipping_charges,
    } = req.body;

    const user_id = req.user.id;

    // Count cart items with order status "add to cart"
    const cartItemCount = await cart.countDocuments({
      user_id,
      orderstatus: "add to cart",
    });

    if (cartItemCount === 0) {
      return res.status(400).send({ status: "failed", message: "No items in the cart to place an order." });
    }
    const cartItems = await cart.find({ user_id, orderstatus: "add to cart" }).populate("product_variant_id", "selling_price").populate("product_id", "selling_price");
    
    let subTotalAmount = 0;
    
    cartItems.forEach(item => {
      const price = item.product_id ? item.product_id.selling_price : item.product_variant_id.selling_price;
      const quantity = item.product_qty;
      subTotalAmount += price * quantity;
    });

    const taxAmount = 0;  // Add logic if there are taxes
    const grandTotalAmount = subTotalAmount + (shipping_charges || 0) + taxAmount;

    // Debugging the values
    console.log("Shipping Charges:", shipping_charges);
    console.log("Sub Total Amount:", subTotalAmount);
    console.log("Grand Total Amount:", grandTotalAmount);
    const newOrder = new order({
      orderid: `ORD-${Date.now()}-${uuidv4().slice(0, 4)}`,
      // Unique order ID with timestamp and UUID
      user_id,
      shipping_first_name,
      shipping_last_name,
      shipping_address1,
      shipping_address2,
      shipping_country,
      shipping_state,
      shipping_city,
      shipping_pincode,
      shipping_mobile,
      shipping_email,
      grand_total_amount: grandTotalAmount, // Corrected grand total
  sub_total_amount: subTotalAmount,  
      payment_method,
      payment_status,
      payment_key,
      shipping_charges
    });

    const savedOrder = await newOrder.save();

    if (!savedOrder) {
      return res.status(500).send({ status: "failed", message: "Order could not be created." });
    }

    // Update cart items with confirmed order status
    const updatedCart = await cart.updateMany(
      { user_id, orderstatus: "add to cart" },
      { $set: { orderstatus: "confirmed", orderid: savedOrder.orderid } }
    );
    const websiteinfo = await website_info.find();
    // Fetch updated cart items
    const existingCartItem = await cart
      .find({ orderid: savedOrder.orderid })
      .populate("product_variant_id", "product_name product_image1 description selling_price mrp_price weight weighttype")
      .populate("product_id", "product_name product_image1 description selling_price mrp_price weight weighttype");

    // Prepare and send email
    const emailHtml = `<div class="row">
    <div class="col-xs-12">
        <div class="container-fluid">
            <table width="99%" border="0" align="center" cellpadding="0" cellspacing="0" style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; border: 1px solid #eee;">
                <tbody>
                    <tr>
                        <td style="border-bottom: 1px solid #eee; height: 24px; font-size: 14px;" align="center"><strong>TAX INVOICE</strong></td>
                    </tr>
                    <tr>
                        <td width="50%" valign="top" style="border-bottom: 1px solid #eee; padding: 8px; line-height: 20px;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td width="49%"><strong>Company Name :</strong> ${websiteinfo[0].website_name}<br>
                                            <strong>Address:</strong> ${websiteinfo[0].address} <br>
                                            <strong>Phone no.: </strong>+91${websiteinfo[0].mobile_no}<br>
                                            <strong>Email: </strong>${websiteinfo[0].email}<br>
                                            <strong>GSTIN:</strong> ${websiteinfo[0].gstno}
                                        </td>
                                        <td width="51%" align="right"><img src="https://demo-ecomus-global.myshopify.com/cdn/shop/files/Ecomus.svg?v=1699583364&width=272" alt="Company Logo" style="width: 150px;"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td width="50%" height="24" style="border-bottom: 1px solid #eee; border-right: 1px solid #eee; padding: 8px; font-family: Arial, Helvetica, sans-serif; font-size: 12px;"><strong>SHIPPING ADDRESS</strong></td>
                                        <td width="50%" align="right" style="border-bottom: 1px solid #eee; padding: 8px; font-family: Arial, Helvetica, sans-serif; font-size: 12px;"><strong>Invoice No.: ${savedOrder.orderid}</strong></td>
                                    </tr>
                                    <tr>
                                        <td width="50%" valign="top" style="border-bottom: 1px solid #eee; border-right: 1px solid #eee; padding: 8px; line-height: 20px; font-family: Arial, Helvetica, sans-serif; font-size: 12px;">
                                            <p>
                                                <strong>Name:</strong> ${savedOrder.shipping_first_name}&nbsp;${savedOrder.shipping_last_name}<br>
                                                <strong>Address:</strong> ${savedOrder.shipping_address1},${savedOrder.shipping_address2},${savedOrder.shipping_city},${savedOrder.shipping_state},${savedOrder.shipping_country}-${savedOrder.shipping_pincode}<br>
                                                <strong>Phone no.: </strong>${savedOrder.shipping_mobile}<br>
                                                <strong>Email: </strong>${savedOrder.shipping_email}
                                            </p>
                                        </td>
                                        <td width="50%" align="right" valign="top" style="border-bottom: 1px solid #eee; padding: 8px; line-height: 20px; font-family: Arial, Helvetica, sans-serif; font-size: 12px;">
                                            <p><strong>Date: ${savedOrder.order_date}</strong></p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr style="border-bottom: 1px solid #eee; border-right: 1px solid #eee;">
                        <td>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td width="5%" height="24" align="center" style="border-bottom: 1px solid #eee; border-right: 1px solid #eee; background: #CCC; font-family: Arial, Helvetica, sans-serif; font-size: 12px;"><strong>S.NO.</strong></td>
                                        <td style="border-bottom: 1px solid #eee; border-right: 1px solid #eee; background: #CCC; font-family: Arial, Helvetica, sans-serif; font-size: 12px;" width="29%" align="center"><strong>PRODUCT DESCRIPTION</strong></td>
                                        <td style="border-bottom: 1px solid #eee; border-right: 1px solid #eee; font-family: Arial, Helvetica, sans-serif; font-size: 12px; background: #CCC;" width="15%" align="center"><strong>Qty</strong></td>
                                        <td style="border-bottom: 1px solid #eee; border-right: 1px solid #eee; font-family: Arial, Helvetica, sans-serif; font-size: 12px; background: #CCC;" width="15%" align="center"><strong>Price Per Product</strong></td>
                                        <td style="border-bottom: 1px solid #eee; font-family: Arial, Helvetica, sans-serif; font-size: 12px; background: #CCC;" width="12%" align="center"><strong>Total Price</strong></td>
                                    </tr>
                                    ${existingCartItem.map((rescart, index) => (
                                      `<tr>
                                      <td width="5%" height="24" align="center" style={{ borderBottom: '1px solid black', borderRight: '1px solid black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px' }}>&nbsp;${index + 1}</td>
                                      <td style={{ borderBottom: '1px solid black', borderRight: '1px solid black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px' }} width="29%" align="center">&nbsp;${rescart.product_name}</td>
                    
                                      <td style={{ borderBottom: '1px solid black', borderRight: '1px solid black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px' }} width="15%" align="center">&nbsp;${rescart.product_qty}</td>
                                      <td style={{ borderBottom: '1px solid black', borderRight: '1px solid black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px' }} width="12%" align="center">&nbsp;${rescart.product_id == null ? rescart.product_variant_id.selling_price : rescart.product_id.selling_price}</td>
                                      <td style={{ borderBottom: '1px solid black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px' }} width="12%" align="center">&nbsp;${rescart.product_id == null ? rescart.product_variant_id.selling_price * rescart.product_qty : rescart.product_id.selling_price * rescart.product_qty}</td>
                                    </tr>`
                                    ))}
                                    <tr>
                                        <td colspan="3" align="center" style="border-bottom: 1px solid #eee; border-right: 1px solid #eee; background: #CCC; font-family: Arial, Helvetica, sans-serif; font-size: 14px; font-weight: bold;">Total</td>
                                        <td colspan="3" style="border-bottom: 1px solid #eee; font-family: Arial, Helvetica, sans-serif; background: #CCC; font-size: 14px; font-weight: bold;" width="15%" align="center">${savedOrder.sub_total_amount}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td width="20%" valign="top" style="padding: 8px 6px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; display: flex; justify-content: space-between;">
                                            <strong>Sub Total :</strong> ${savedOrder.sub_total_amount} Rupees
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr style="border-top: 1px solid #eee;">
                                        <td width="20%" valign="top" style="padding: 8px 6px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; display: flex; justify-content: space-between;">
                                            <strong>Shipping Charges :</strong>  ${savedOrder.shipping_charges} Rupees
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr style="border-top: 1px solid #eee;">
                                        <td width="20%" valign="top" style="padding: 8px 6px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; display: flex; justify-content: space-between;">
                                            <strong>Grand Total :</strong> ${savedOrder.grand_total_amount} Rupees
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    </div>
    `;
    
    

    await sendEmail(shipping_email, "Order Confirmation", "Order Details With Invoice", emailHtml);

    res.send({ status: "successfully", order: savedOrder, updatedCart, existingCartItem });
  } catch (err) {
    console.error(`Error: ${err}`);
    res.status(500).send({ status: "failed", errors: err.message });
  }
};

module.exports = createorder;
