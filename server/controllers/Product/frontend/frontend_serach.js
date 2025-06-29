const product = require("../../../Models/product");
const productVariant = require("../../../Models/product_variant");

const searchitem = async (req, res) => {
  try {
    const searchTermRaw = req.params.name;
    if (!searchTermRaw || searchTermRaw.trim() === "") {
      return res.status(400).json({ error: "Search term is required." });
    }

    const searchTerm = searchTermRaw.toLowerCase().trim();
    console.log("Search Term:", searchTerm);

    // ✅ CUSTOM CASE: Search term includes "table"
    if (searchTerm.includes("table")) {
      // Find one table product
      const tableProduct = await product.findOne({
        $or: [
          { parent_category: { $regex: "table", $options: "i" } },
          { child_category: { $regex: "table", $options: "i" } },
          { product_name: { $regex: "table", $options: "i" } },
        ],
      });

      // Find 2 sofa products
      const sofaProducts = await product
        .find({
          $or: [
            { parent_category: { $regex: "sofa", $options: "i" } },
            { child_category: { $regex: "sofa", $options: "i" } },
            { product_name: { $regex: "sofa", $options: "i" } },
          ],
        })
        .limit(2);

      if (!tableProduct) {
        return res.status(404).json({ error: "No 'table' product found." });
      }

      return res.json({
        status: "custom",
        results: [tableProduct, ...sofaProducts],
      });
    }

    // ✅ DEFAULT SEARCH
    const productResults = await product.find({
      product_name: { $regex: searchTerm, $options: "i" },
    });

    const variantResults = await productVariant.find({
      product_name: { $regex: searchTerm, $options: "i" },
    });

    return res.json({
      status: "successful",
      results: [...productResults, ...variantResults],
    });
  } catch (error) {
    console.error("Error in searchitem:", error);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = searchitem;
