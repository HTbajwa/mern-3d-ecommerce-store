import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Subsubcategory = ({ subvalue }) => {
  const [categories, setCategories] = useState([]);
  const nvg = useNavigate();

  const transfer = (id, title) => {
    nvg(`/category/${id}/${title}/none`);
  };

  useEffect(() => {
    async function fetchcategory() {
      try {
        const response = await axios.get(subvalue);
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else if (Array.isArray(response.data.categories)) {
          setCategories(response.data.categories);
        } else {
          console.error("Unexpected response structure:", response.data);
          setCategories([]);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }

    fetchcategory();
  }, [subvalue]);

  return (
    <div className="menu-content">
      <ul>
        {categories.map((item, index) => (
          <li key={item._id || index}>
            <button
              type="button"
              onClick={() => transfer(item._id, item.name)}
              style={{ fontSize: "13px" }}
              className="btn"
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subsubcategory;
