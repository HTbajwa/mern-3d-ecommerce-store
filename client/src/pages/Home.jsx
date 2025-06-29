import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useGetBannerQuery } from '../store/api/bannerApi';
import { useGetAllCategoriesQuery } from '../store/api/categoryapi'; // Import the hook for fetching categories
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Subpage from './Subpage';
import Loader from '../components/Loader';

const Home = () => {
  const nvg = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(selectedCategory?._id === cat._id ? null : cat);  // Toggle category view
  };
  const { data: Banner, isLoading: Bannerloading } = useGetBannerQuery();
  const { data: categories, isLoading: categoriesLoading } = useGetAllCategoriesQuery(); // Fetch categories from API

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    // You can log or check the categories data if needed
    console.log("Categories fetched:", categories);
  }, [categories]);

  // Access the 'data' field of categories and fallback to an empty array if it's not available
  const categoryList = categories?.data ? categories.data : [];

  if (Bannerloading || categoriesLoading) return <Loader />; // Show a loading state until both Banner and categories are loaded

  return (
    <div className="bg-light">
      <Header />

      {/* Hero Banner */}
      <section className="sale-banenr banner-style2 design2 marginfromtop">
        <Swiper
          modules={[Navigation, Autoplay]}
          loop={true}
          navigation={false}
          autoplay={{ delay: 4000 }}
          slidesPerView={1}
          className="main-swiper"
        >
          {Banner?.data.map((item, index) =>
            item.banner_type === "Banner" ? (
              <SwiperSlide key={index}>
  <div
    style={{
      height: isMobile ? '300px' : '500px',
      overflow: 'hidden',
      position: 'relative',
    }}
  >
    <img
      onClick={() => window.location.href = item.banner_link}
      src={`http://localhost:8000/uploads/images/${item.banner}`}
      alt={`banner-${index}`}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        cursor: 'pointer',
      }}
    />
    
    {/* Centered description */}
    <div
      className="text-center "
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
     color: '#059FE2',
     fontWeight: 'bold',
        padding: '1rem 2rem',
        borderRadius: '8px',
        maxWidth: '80%',
      }}
    >
      
      <p style={{ fontSize: isMobile ? '0.75rem' : '2.5rem' }}>
      Ecomus – Where Comfort Meets Elegance
      </p>
    </div>
  </div>
</SwiperSlide>

            ) : null
          )}
        </Swiper>
      </section>

      <div className="bg-light">
      <section className="py-4">
        <div className="container-fluid">
          <div className="row">
            <h1>Categories</h1>
            {categoryList?.map((cat) => (
              <div className="col-md-4 mb-4" key={cat._id}>
                <div className="card shadow-sm h-100 hover-shadow" onClick={() => handleCategoryClick(cat)}>
                  <img
                    src={
                      cat.banner
                        ? `${import.meta.env.VITE_REACT_APP_API_IMAGE_URL}${cat.banner.replace(/^\/+/, '')}`
                        : "/images/placeholder.jpg"
                    }
                    className="card-img-top"
                    alt={cat.name}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{cat.name}</h5>
                    <p dangerouslySetInnerHTML={{ __html: cat.desc }} className="card-text" />
                    <button className="btn btn-primary btn-sm mt-2">Explore</button>
                  </div>
                </div>

                {/* Show subcategories if the category is selected */}
             
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>


      {/* Why Shop With Us */}
      <section className="bg-white py-5">
        <div className="container text-center">
          <h4 className="mb-4">Why Shop With Us?</h4>
          <div className="row">
            {[{ icon: '🚚', title: 'Free Shipping', desc: 'On all orders above $50' },
              { icon: '🔒', title: 'Secure Payment', desc: '100% safe and secure' },
              { icon: '💬', title: '24/7 Support', desc: 'We are here for you' }]
              .map((info, idx) => (
                <div className="col-md-4" key={idx}>
                  <div className="p-4 hover-scale">
                    <div className="display-4 mb-2">{info.icon}</div>
                    <h6>{info.title}</h6>
                    <p className="text-muted">{info.desc}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="bg-light py-5">
        <div className="container">
          <h4 className="text-center mb-4">What Our Customers Say</h4>
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 5000 }}
            loop={true}
            slidesPerView={1}
            spaceBetween={20}
          >
            {[{ name: 'Ali', comment: 'Great quality and fast delivery!' },
              { name: 'Sara', comment: 'Loved the customer service.' },
              { name: 'John', comment: 'Highly recommend this store!' }]
              .map((review, idx) => (
                <SwiperSlide key={idx}>
                  <div className="text-center px-4">
                    <blockquote className="blockquote">
                      <p>“{review.comment}”</p>
                    </blockquote>
                    <footer className="blockquote-footer">{review.name}</footer>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </section>

      {/* Promotion Slider */}
      <section className="sale-banenr banner-style2 design2">
        <Swiper
          modules={[Navigation, Autoplay]}
          loop={true}
          navigation={false}
          autoplay={{ delay: 3000 }}
          slidesPerView={1}
          className="promotion-swiper"
        >
          {Banner?.data.map((item, index) =>
            item.banner_type === "Slider" ? (
              <SwiperSlide key={index} style={{ height: isMobile ? '300px' : '400px', position: 'relative' }}>
              {/* Banner Image */}
              <div className="d-flex justify-content-center align-items-center h-100">
                <img
                  onClick={() => window.location.href = item.banner_link}
                  src={`http://localhost:8000/uploads/images/${item.banner}`}
                  alt={`banner-${index}`}
                  className="img-fluid mainbanner bg-img"
                  style={{ width: '70%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                />
              </div>
            
              {/* Centered Title Overlay */}
              <div
                className="text-center text-black"
                style={{
                  position: 'absolute',
                  top: '90%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                color:'#005B5E',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '8px',
                }}
              >
                <p style={{ fontSize: isMobile ? '1.25rem' : '2.25rem', margin: 0 }}>
              
                </p>
              </div>
            </SwiperSlide>
            
       
                 
              
            ) : null
          )}
        </Swiper>
        
      </section>

      <Footer />
    </div>
  );
};

export default Home;
