const product = require("../../Models/product");
const slugify = require("slugify");

const createproduct = async (req, res) => {
  try {
    const {
      product_name,
      product_url,
      meta_title,
      meta_keywords,
      meta_description,
      featuredproduct,
      trendingproduct,
      newarrivedproduct,
      editor,
      parent_category,
      child_category,
      sort_description,
      weight_type,
      weight,
      stock,
      mrp_price,
      selling_price,
      status,
      color,
      brand,
      size,
    } = req.body;

    console.log("first parent category is here", parent_category);

    // Handle model3D file inside the function
    let model3DFile = null;
    if (req.files.model3D && req.files.model3D[0]) {
     // Correctly assign model3D path
     model3DFile = req.files.model3D[0].filename;

    }

    const insertproduct = new product({
      product_name,
      sort_description,
      product_url: slugify(product_url),
      product_image1: req.files.product_image1?.[0]?.filename || "",
      product_image2: req.files.product_image2?.[0]?.filename || "",
      product_image3: req.files.product_image3?.[0]?.filename || "",
      product_image4: req.files.product_image4?.[0]?.filename || "",
      model3D: model3DFile,
      description: editor,
      size,
      color,
      brand,
      meta_title,
      newarrivedproduct,
      trendingproduct,
      featuredproduct,
      parent_category,
      child_category,
      meta_keywords,
      meta_description,
      weight_type,
      selling_price,
      mrp_price,
      stock,
      status,
      weight,
    });

    const response = await insertproduct.save();
    res.send({ status: "successfully", data: response });

  } catch (err) {
    console.log(`here is error ${err}`);
    res.send({ status: "failed", errors: err });
  }
};

module.exports = createproduct;
