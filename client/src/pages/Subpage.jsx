import React, { useState } from 'react'

const Subpage = () => {
   
      const [selectedCategory, setSelectedCategory] = useState(null);
    
      const handleCategoryClick = (cat) => {
        setSelectedCategory(selectedCategory?._id === cat._id ? null : cat);  // Toggle category view
      };
  return (
    <div>
          {selectedCategory?._id === cat._id && (
                  <div className="subcategories mt-4">
                    <h5>Subcategories</h5>
                    <div className="row">
                      {cat.subcategories?.map((sub) => (
                        <div className="col-md-4 mb-4" key={sub._id}>
                          <div className="card shadow-sm h-100 hover-shadow" onClick={() => window.location.href = sub.url}>
                            <img
                              src={
                                sub.banner
                                  ? `${import.meta.env.VITE_REACT_APP_API_IMAGE_URL}${sub.banner.replace(/^\/+/, '')}`
                                  : "/images/placeholder.jpg"
                              }
                              className="card-img-top"
                              alt={sub.name}
                            />
                            <div className="card-body text-center">
                              <h5 className="card-title">{sub.name}</h5>
                              <p dangerouslySetInnerHTML={{ __html: sub.desc }} className="card-text" />
                              <button className="btn btn-primary btn-sm mt-2">Explore</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
    </div>
  )
}

export default Subpage