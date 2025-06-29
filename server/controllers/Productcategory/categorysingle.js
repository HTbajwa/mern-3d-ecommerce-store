const category = require("../../Models/category");
const mongoose = require("mongoose");
const categorysingle = async (req, res) => {
    try {
      const categories = await category.findById(req.params.id).populate('parentcategory'); // Populate parent categories
      if (!categories) {
        return res.status(404).send({ error: "Category not found" });
      }
  
      res.send({
        status: "successfully",
        data: categories,
        parent: categories.parentcategory, // Populated data
        slug: categories.url.replace(/-/g, ' '),
      });
    } catch (err) {
      console.error("Error fetching category:", err.message);
      res.status(500).send({ error: "An error occurred while fetching categories" });
    }
  };
  const fetchchildcategory = async (categoryarray) => {
    if (categoryarray && categoryarray.length > 0) {
      try {
        const categories = await category.find({ _id: { $in: categoryarray } });
        return categories;
      } catch (error) {
        console.error("Error fetching child categories:", error.message);
        return [];
      }
    } else {
      return [];
    }
  };
  

module.exports = categorysingle;