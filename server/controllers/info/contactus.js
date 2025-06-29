const Contact = require("../../Models/contactus");

const contactus = async (req, res) => {
    try {
       

        // Use correct field names
        const { firstname, lastname, mobile, email, Message } = req.body;

        const senddata = new Contact({
            firstname,
            lastname,
            mobile,
            email,
            Message
        });

        const rel = await senddata.save();
        res.status(201).json({ status: "successful", data: rel });

    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ status: "failed", error: error.Message });
    }
};

module.exports = contactus;
