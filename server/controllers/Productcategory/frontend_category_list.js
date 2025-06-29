const category = require('../../Models/category');

const frontendcategorylist = async (req, res) => {
  try {
    const categories = await category.find(); // fetch all regardless of status

    const mainCategories = [];
    const categoriesMap = new Map();

    // Step 1: Build map of all categories
    categories.forEach((cat) => {
      categoriesMap.set(cat._id.toString(), { ...cat._doc, subcategories: [] });
    });

    // Step 2: Build main -> subcategory hierarchy
    categories.forEach((cat) => {
      const parentCategory = cat.parentcategory || [];

      if (parentCategory.length === 0) {
        mainCategories.push(categoriesMap.get(cat._id.toString()));
      } else {
        const parent = categoriesMap.get(parentCategory[0].toString());
        if (parent) {
          parent.subcategories.push(categoriesMap.get(cat._id.toString())); // use mapped version
        }
      }
    });

    res.status(200).json({ status: 'success', data: mainCategories });
  } catch (error) {
    res.status(500).json({ status: 'failed', error: error.message });
  }
};

module.exports = frontendcategorylist;
