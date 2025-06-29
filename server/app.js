const userrouter=require("./routes/userRouter")
const categoryrouter=require("./routes/categoryRouter")
const productrouter=require("./routes/productRouter")
const variantrouter = require("./routes/variantRouter")
const inforouter=require("./routes/infoRouter")
const cartrouter = require("./routes/cartRouter.js")
const orderrouter = require("./routes/orderRouter.js")
const bannerrouter = require("./routes/bannerRouter")
const attributerouter = require("./routes/attributeRouter.js")
const wishlistrouter=require("./routes/wishlistRouter")
const addressrouter = require("./routes/addressRouter.js")
const express=require("express")
const path = require('path');

const app=express();
const port=8000;
const bodyParser=require("body-parser")
const cors=require("cors");
const connectdb = require("./db/connection");
const database="mongodb+srv://tariqhadia12:hadiatariq@cluster0.gjl7f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url} - Headers:`, req.headers);
    next();
  });
  
app.use(bodyParser.json())
app.use(express.json())

app.use(express.urlencoded({ extended: true })); // Optional for form data
// Set proper MIME types
app.use((req, res, next) => {
  if (req.url.endsWith(".glb")) {
    res.setHeader("Content-Type", "model/gltf-binary");
  }
  if (req.url.endsWith(".usdz")) {
    res.setHeader("Content-Type", "model/vnd.usdz+zip");
  }
  next();
});

// Allow CORS globally (optional if you already do per-route)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Serve static files correctly
const uploadsPath = path.join(__dirname, "public", "uploads");
app.use("/uploads", express.static(uploadsPath));


  
app.use(cors({
  origin: "*", // Allow all origins
  methods: "GET, POST, PUT, PATCH, DELETE",
  allowedHeaders: "Content-Type, Authorization"
}));




require("./Models/contactus")
require("./Models/website_info")
require("./Models/usertable")
require("./Models/category")
require("./Models/product")
require("./Models/product_variant");
require("./Models/cart")
require("./Models/order");
require("./Models/banner")
require("./Models/attribute")
require("./Models/wishlist")
require("./Models/address");
app.use("/api/user",userrouter)
app.use("/api/category",categoryrouter)
app.use("/api/product",productrouter)
app.use("/api/variant", variantrouter);
app.use("/api/cart", cartrouter);
app.use("/api", inforouter);
app.use("/api/order",orderrouter);
app.use("/api/banner", bannerrouter);
app.use("/api/attribute", attributerouter);
app.use("/api/wishlist", wishlistrouter);
app.use("/api/address",addressrouter);
connectdb(database)
app.listen(port, '0.0.0.0', () => {
    console.log(`server is running at ${port}`);
});
