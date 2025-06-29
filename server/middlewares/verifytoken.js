const jwt = require("jsonwebtoken");
const secretKey = "123456789";

const Authenticationtoken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    console.log("🔍 Received Headers:", req.headers); // Debugging

    // Check if Authorization header is present and starts with "Bearer "
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return res.status(401).json({ status: "failed", error: "Unauthorized: Missing or invalid token" });
    }

    // Extract and clean the token
    const token = authorizationHeader.slice(7).trim();
    console.log("🔑 Extracted Token:", token); // Debugging

    // Validate token format
    if (!token || typeof token !== "string" || token.length === 0) {
        return res.status(401).json({ status: "failed", error: "Unauthorized: Invalid token format" });
    }

    // Verify and decode the token
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error("❌ JWT Verification Error:", err.message);

            // Handle specific JWT errors
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ status: "failed", error: "Unauthorized: Token expired" });
            } else if (err.name === "JsonWebTokenError") {
                return res.status(401).json({ status: "failed", error: "Unauthorized: Invalid token" });
            } else {
                return res.status(401).json({ status: "failed", error: "Unauthorized: Token verification failed" });
            }
        }

        // Log decoded token details
        console.log("🔑 Decoded Token:", decoded); // Debugging
        console.log("🕒 Token Expiration Time:", decoded.exp); // Debugging

        // Attach the decoded payload to the request object
        req.user = decoded;
        next();
    });
};

module.exports = Authenticationtoken;
