import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Footer from "../components/Footer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaRegHeart,FaHeart } from "react-icons/fa6";
import { getrecetly, gettoken, recentlystore } from "../Localstorage/Store";
import { useGetSingleProductQuery } from "../store/api/productapi";
import { usePostCartItemMutation } from "../store/api/cartapi";
import { useGetWishlistCountQuery, usePostDeleteWishlistMutation, usePostWishlistItemMutation } from "../store/api/wishlistapi";
import { useDispatch, useSelector } from "react-redux";
import { addwishlist } from "../store/state/wishlist";
import ModelViewer from "../modelcomponent/ModelViewer.jsx";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ReactQRCode from 'react-qr-code';
// optional for modal popup


function Productdetails() {
  
  
  const location = useLocation();
  const nvg = useNavigate();
  const { id } = useParams();
  const recentlydata = getrecetly();
  const dispatch = useDispatch();
  const checktoken = gettoken()
  const globalvariable = useSelector(state => state);
  const [viewimg, setviewimg] = useState("");
  const [qty, setqty] = useState(1);
  const [showoption, setshowoption] = useState(0);
  const [loading, setloading] = useState(true);
  const [delto, setdelto] = useState("");
  const [Data23, setData] = useState([]);
  const [delresponse, setdelresponse] = useState({ status: false, msg: "" });
  const { data,isLoading,refetch } = useGetSingleProductQuery(id);
  const [addincart] = usePostCartItemMutation();
  const [addtowishlistapi] = usePostWishlistItemMutation();
  const [removetowishlistapi] = usePostDeleteWishlistMutation();
  const {data:wishlistcount,isLoading:wislistloading,refetch:wishlistrefetch} = useGetWishlistCountQuery()

// 3d state
const [show3D, setShow3D] = useState(false);
const navigate = useNavigate();

const handle3DViewToggle = () => {
  console.log("Navigating to 3D model page...");
  console.log("Model Path: ", `${import.meta.env.VITE_REACT_APP_API_IMAGE_URL}${Data23[showoption]?.model3D}`);

  setShow3D(!show3D);
  navigate("/3dmodel", {
    state: { modelPath: `${import.meta.env.VITE_REACT_APP_API_IMAGE_URL}${Data23[showoption]?.model3D}` },
  });
};


// Add state
const [showQR, setShowQR] = useState(false);

// AR link
const arLink = `${window.location.origin.replace('localhost', '192.168.187.227')}/ar-view?model=${encodeURIComponent(import.meta.env.VITE_REACT_APP_API_IMAGE_URL.replace('localhost', '192.168.100.41') + Data23[showoption]?.model3D)}`;

  const devto = () => {
    if (delto == "") {
       console.log("dddd",delresponse)
      // setdelresponse["status"] = true;
      // setdelresponse["msg"] = "Deliver to field is required";
      setdelresponse({ status: true, msg: "Deliver to field is required" });
    } else {
      // setdelresponse["status"] = true;
      // setdelresponse["msg"] = "Something went wrong please try Again";
      setdelresponse({
        status: true,
        msg: "Something went wrong please try Again",
      });
    }
    setdelto("");
    setTimeout(() => {
      setdelresponse({ status: false, msg: "" });
    }, 4000);
  };
  const imageBaseURL = import.meta.env.VITE_REACT_APP_API_IMAGE_URL;
  const baseURL = import.meta.env.VITE_REACT_APP_API_URL;
 
  const redirectfun = (linkpage) => {
    nvg(linkpage);
  };

  const profilepage = (val) => {
    nvg("/profile", { state: { id: val } });
  };

  const incrementcart = () => {
    setqty(qty + 1);
  };
  const decrementcart = () => {
    if (qty > 1) {
      setqty(qty - 1);
    }
  };


  const Addtowishlist = async () => {
    if(checktoken){
    const wishlist_value = {
      product_name:Data23[showoption].product_name,
      product_id:Data23[showoption].product_id ? null : Data23[showoption]._id,
     item_or_variant:Data23[showoption].product_id ? "variant" : "item",
     product_variant_id:Data23[showoption].product_id ? Data23[showoption]._id : null
   }

   const response = await addtowishlistapi(wishlist_value);
          if (response.data.status == "successfully") {
            wishlistrefetch()
            if(wislistloading == false){
              // dispatch(addwishlist(globalvariable.wishlist + 1));
              dispatch(addwishlist(wishlistcount.totalItems));
              refetch()
            }
          }
        }else{
          nvg('/login')
        }
  };
  const Removetowishlist = async () => {
    const wishlist_value = {
      product_id:Data23[showoption].product_id ? null : Data23[showoption]._id,
     item_or_variant:Data23[showoption].product_id ? "variant" : "item",
     product_variant_id:Data23[showoption].product_id ? Data23[showoption]._id : null
   }

   const response = await removetowishlistapi(wishlist_value);
          if (response.data.status == "successfully") {
            // dispatch(addwishlist(globalvariable.wishlist - 1));
            wishlistrefetch()
            if(wislistloading == false){
              dispatch(addwishlist(wishlistcount.totalItems));
              refetch()

            }
          }
  };



  // add to cart start here
  const addtocartfun = async () => {
    console.log("ddddddxxxxxxxxxxxxxxxxx")
    try {

      const cart_value = {
   product_name:Data23[showoption].product_name,
   product_id:Data23[showoption].product_id ? null : Data23[showoption]._id,
   product_qty:qty,
  item_or_variant:Data23[showoption].product_id ? "variant" : "item",
  product_variant_id:Data23[showoption].product_id ? Data23[showoption]._id : null
}
        const response = await addincart(cart_value);
        console.log("response of add to cart",response)
          if (response.data.status == "successfully") {
            nvg("/cart");
            // window.location.reload();
          }
      } catch (error) {}
  };
  //  add to cart item end here

  let ispresent = false;
  useEffect(() => {
    
      console.log("viewimg changed:", viewimg);
 
    
    const addProductToRecentlyViewed = (mydata, id) => {
      if (recentlydata == null) {
        recentlystore([id]);
      } else {
        if (recentlydata.some((obj) => obj === id)) {
          console.log(`Object with id ${mydata} is in the array!`);
          ispresent = true;
        } else {
        }
        if (ispresent == false) {
          console.log(`Object with id ${mydata} is not in the array.`, mydata);
          // if (recentlyViewed.length < 13) {
          //   console.log("first 13 leng")
          //   // If the array size is less than the maximum, simply add the new object
          //   setRecentlyViewed([...recentlyViewed, mydata]);
          // } else {
          // If the array size is equal to the maximum, replace the oldest element

          recentlystore([...recentlydata, id]);
          // }
        }
      }
    };
    setloading(true)
    if (!isLoading && data) {
      const newdata1 = [
        ...(data?.data ? [data.data] : []),
        ...(Array.isArray(data?.productvariant) ? data.productvariant : [])
      ];
  
      console.log("✔ newdata1", newdata1);
  
      if (newdata1.length > 0) {
        const newdata = newdata1.map(item => ({
          ...item,
          weightandtype: `${item?.weight} ${item?.weight_type}`,
        }));
  
        console.log("this is latest data", newdata);
  
        setData(newdata);
      } else {
        console.warn("⚠️ No valid product data found!");
      }
  
      setloading(false);
    }
  }, [data, isLoading, viewimg]);
  const transfer = () => {
    nvg("/category", {
      state: {
        id: location.state?.categoryid,
        pagename: location.state?.pagename,
      },
    });
    window.location.reload();
  };

  const transfer3 = (productid) => {
    nvg("/productdetails", {
      state: {
        id: productid,
        categoryid: location.state?.categoryid,
        pagename: location.state?.pagename,
      },
    });
    window.location.reload();
  };

  useEffect(() => {
    if (Data23?.[showoption]?.product_image1) {
      setviewimg(`${imageBaseURL}${Data23[showoption].product_image1}`);
    }
  }, [Data23, showoption]);

  const thumbnails = [
    Data23?.[showoption]?.product_image1,
    Data23?.[showoption]?.product_image2,
    Data23?.[showoption]?.product_image3,
    Data23?.[showoption]?.product_image4,
  ].filter(Boolean); // removes undefined/null values

const [wishlist, setWishlist] = useState(Data23?.[showoption]?.wishlist_status || false);

const toggleWishlist = () => {
  if (wishlist) {
    Removetowishlist();
  } else {
    Addtowishlist();
  }
  setWishlist(!wishlist); // This updates the UI
};



  return isLoading == true ? (
    ""
  ) : (
    <>
      <Header />

      {/* breadcrumb start */}
      <div className="breadcrumb-main marginfromtop">
        <div className="container m-0">
          <div className="row">
            <div className="col">
              <div
                className="breadcrumb-contain m-0"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "5px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  {/* <h2>product</h2> */}
                  <ul>
                    <li>
                      <a href="/">home</a>
                    </li>
                    <li style={{ fontSize: "12px" }}>&gt;</li>
                    <li>
                      <p
                        onClick={() => {
                          transfer();
                        }}
                        style={{ cursor: "pointer", fontSize: "12px" }}
                      >
                        {data?.parentcategory?.[0]?.name}
                      </p>
                    </li>
                    <li style={{ fontSize: "12px" }}>&gt;</li>
                    <li>
                      <a
                        href="javascript:void(0)"
                        style={{
                          fontSize: "12px",
                          textTransform: "capitalize",
                        }}
                      >
                        {data?.childcategory?.[0]?.name}
                      </a>
                    </li>
                  </ul>
                </div>
                <div
                  className="header-contain"
                  style={{ padding: "8px 0px 0px 0px" }}
                >
                  <div
                    className="icon-block  twoicon"
                    style={{ width: "100%", display: "none" }}
                  >
                    <ul
                      className="theme-color"
                      style={{
                        width: "100%",
                        background: "",
                        justifyContent: "space-around",
                        paddingRight: "10px",
                      }}
                    >
                      <li
                        className=" icon-md-block"
                        onClick={() => redirectfun("/")}
                      >
                      </li>
                      <li></li>
                      <li
                        className="mobile-setting "
                        onClick={() => redirectfun("/order-history")}
                      ></li>
                      <li
                        className="mobile-wishlist item-count icon-desk-none"
                        onClick={() => redirectfun("/wishlist")}
                      >
                        <img
                          src="./images/mega-store/brand/heart.png"
                          className="newwidthpro hellopooja"
                          alt="heart"
                        />
                        <label
                          htmlFor=""
                          style={{ fontSize: "10px", margin: "0px" }}
                        >
                          Wishlist
                        </label>
                        <div
                          className="item-count-contain inverce"
                          style={{ top: "-4px", left: "9px" }}
                        >
                          {" "}
                          1{" "}
                        </div>
                      </li>
                      <li
                        className="mobile-cart
                      item-count"
                        onClick={() => {
                          redirectfun("/cart");
                        }}
                      >
                        <img
                          src="./images/mega-store/brand/shopping-cart.png"
                          className="newwidthpro  hellopooja"
                          alt="cart"
                        />
                        <label
                          htmlFor=""
                          style={{ fontSize: "10px", margin: "0px" }}
                        >
                          Cart
                        </label>

                        <div
                          className="item-count-contain inverce"
                          style={{ top: "-4px", left: "9px" }}
                        >
                          {" "}
                          {2}{" "}
                        </div>
                        {/* <div className="item-count-contain inverce" style={{top:'-4px',left:'9px'}}> {Cartnumber} </div> */}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* breadcrumb End */}
      {/* section start */}
      <section
        className="section-big-pt-space b-g-light"
        style={{ background: "white" }}
      >
        <div className="collection-wrapper">
          <div className="custom-container">
            <div className="row">
              <div className="col-lg-12 col-sm-12 col-xs-12">
                <div className="container-fluid">
                  {/* <div className="row">
                      <div className="col-xl-12">
                      </div>
                    </div> */}
                  <div
                    className="row"
                    style={{ display: "flex", alignItems: "flex-start" }}
                  >
                    <div className="col-lg-6 makestk">
                      <div className="row">
                        <div className="col-md-3 col-3 superpadding3">
                          <div
                            className="container-fluid px-lg-4 px-md-3 px-2"
                            style={{ paddingLeft: "0px", paddingRight: "0px" }}
                          >
                            <div
                              style={{ padding: "0px 0px 5px 0px" }}
                              className="shirt"
                            >
                              {console.log(
    "📷 Image URL:",
    `${import.meta.env.VITE_REACT_APP_API_IMAGE_URL}${Data23?.[showoption]?.product_image1}`
  )} 
                              <img
                                src={`${import.meta.env.VITE_REACT_APP_API_IMAGE_URL}${Data23?.[showoption]?.product_image1}`}
                                
                                onClick={() => {
                                  setviewimg(
                                    `${import.meta.env.VITE_REACT_APP_API_IMAGE_URL}${Data23?.[showoption]?.product_image1}`
                                  );
                                }}
                                alt
                                style={{ aspectRatio: "1/1" }}
                                className="img-fluid  image_zoom_cls-0"
                              />
                            </div>
                            {Data23?.[showoption]?.product_image2 ? (
                              <div
                                style={{ padding: "5px 0px" }}
                                className="shirt2"
                              >
                                <img
                                  src={`${import.meta.env.VITE_REACT_APP_API_IMAGE_URL}${Data23?.[showoption]?.product_image2}`}
                                  onClick={() => {
                                    setviewimg(
                                      `${import.meta.env.VITE_REACT_APP_API_IMAGE_URL}${Data23?.[showoption]?.product_image2}`
                                    );
                                  }}
                                  alt
                                  style={{ aspectRatio: "1/1" }}
                                  className="img-fluid  image_zoom_cls-1"
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {Data23?.[showoption]?.product_image3 ? (
                              <div
                                style={{ padding: "5px 0px" }}
                                className="shirt3"
                              >
                                <img
                                  src={`${import.meta.env.VITE_REACT_APP_API_IMAGE_URL}${Data23?.[showoption]?.product_image3}`}
                                  onClick={() => {
                                    setviewimg(
                                      `${import.meta.env.VITE_REACT_APP_API_IMAGE_URL}${Data23?.[showoption]?.product_image3}`
                                    );
                                  }}
                                  alt
                                  style={{ aspectRatio: "1/1" }}
                                  className="img-fluid  image_zoom_cls-2"
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {Data23?.[showoption]?.product_image4 ? (
                              <div
                                style={{ padding: "5px 0px" }}
                                className="shirt4"
                              >
                                <img
                                  src={`${import.meta.env.VITE_REACT_APP_API_IMAGE_URL}${Data23?.[showoption]?.product_image4}`}
                                  onClick={() => {
                                    setviewimg(
                                      `${import.meta.env.VITE_REACT_APP_API_IMAGE_URL}${Data23?.[showoption]?.product_image4}`
                                    );
                                  }}
                                  alt
                                  style={{ aspectRatio: "1/1" }}
                                  className="img-fluid  image_zoom_cls-3"
                                />
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-9 col-9">
                          <div className="product-slick ">
                            <div>
                            <div className="flex">
      {/* Thumbnails */}
     
     {/* Main Zoom Image */}
     <div className="ml-8">
  {viewimg ? (
   
      <img
        src={viewimg}
        alt="Product"
        className="w-[500px] h-[600px] object-contain"
        onError={() => console.log("❌ Failed to load image:", viewimg)}
        onClick={() => {
          if (viewimg !== img) {
            setviewimg(img);
          }
        }}
        
      />
   
  ) : (
    <p>Loading image...</p>
  )}
</div>

    </div>

                             </div>
                            </div>
                        </div>
                      </div>
                    </div>
{/* 
glb button  */}






      {/* {show3D && Data23[showoption]?.model3D && (
  <div style={{ height: '500px', marginTop: '20px' }}>
    <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} intensity={1} />
      <ModelViewer
    modelPath = {`${import.meta.env.VITE_REACT_APP_API_IMAGE_URL}${Data23[showoption]?.model3D}`}



      />
      <OrbitControls enableZoom={true} />
    </Canvas>
  </div>
)} */}








                    <div className="col-lg-6 rtl-text p-0">
                      <div
                        className="product-right "
                        style={{
                          boxShadow: "0px 14px 40px 0px rgba(0, 0, 0, 0.12)",
                          borderRadius: "10px",
                          padding: "20px 17px",
                        }}
                      >
                        <div className="pro-group">
                          <h2>{Data23?.[showoption]?.product_name}</h2>
                          <div className="revieu-box">
                            <ul className="pro-price">
                              <li
                                style={{
                                  color: "#059fe2",
                                  fontWeight: "700",
                                  fontSize: "18px",
                                }}
                              >
                                {/* PKR{Data23?.[showoption]?.selling_price} */}
                                PKR{Data23?.[showoption]?.selling_price}{" "}
                                              {Data23?.[showoption]?.stock_record?.discount ==
                                              0 ? (
                                                ""
                                              ) : (
                                                <span
                                                  style={{
                                                    fontSize: "13px",
                                                    margin:'0px',
                                                    color: "#c1c1c1",
                                                    lineHeight: "20px",
                                                    textDecoration:
                                                      "line-through",
                                                    paddingLeft: "0px",
                                                    fontWeight: "400",
                                                  }}
                                                >
                                                  PKR{Data23?.[showoption]?.mrp_price}
                                                </span>
                                              )}
                                              {Data23?.[showoption]?.stock_record?.discount ==
                                              0 ? (
                                                ""
                                              ) : (
                                                <span
                                                  style={{
                                                    fontSize: "13px",
                                                    color: "#059fe2",
                                                    margin:'0px',
                                                    lineHeight: "20px",
                                                    paddingLeft: "1px",
                                                    textDecoration:'none',
                                                    fontWeight: "400",
                                                  }}
                                                >
                                                  {`(${parseInt(
                                                    ((Data23?.[showoption]?.mrp_price -
                                                      Data23?.[showoption]?.selling_price) /
                                                      Data23?.[showoption]?.mrp_price) *
                                                      100
                                                  )}%off)`}
                                                </span>
                                              )}
                              </li>
                          
                              <li style={{ color: "black", fontSize: "11px" }} onClick={toggleWishlist}>
  {wishlist ? <FaHeart size={19} color="#059fe2" /> : <FaRegHeart size={19} />}
</li>

                            </ul>
                            
                          </div>
                          <button onClick={handle3DViewToggle} className="btn btn-primary">
        {show3D ? "Hide 3D View" : "View in 3D"}
      </button>
                        </div>




                        {Data23[showoption]?.model3D && (
  <>
    <button
      onClick={() => setShowQR(true)}
      className="btn btn-secondary"
    >
      View in AR (via QR)
    </button>

    {showQR && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-md font-semibold mb-4">Scan this QR Code on your phone</h2>
          <ReactQRCode value={arLink} size={200} />
          <p className="mt-2 text-sm"></p>
          <button
            onClick={() => setShowQR(false)}
            className="mt-4 btn btn-secondary px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    )}
  </>
)}




                        <div
                          id="selectSize"
                          className="pro-group addeffect-section product-description border-product d-flex"
                          style={{
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                          }}
                        >


{Data23.map((item,index)=>(
<div className="productdetailcontainer customwidth" style={{display:index == 0 && item.brand != "" && item.brand != undefined && item.brand != undefined ? "block" : "none"}}>
                              <h6 className="product-title mt-2" style={{display:index == 0 && item.brand != "" && item.brand != undefined && item.brand != undefined ? "block" : "none"}}>
                                Brand
                              </h6>
                                
                              <div className="size-box">
                                <ul>
                                {Data23.map((item,index)=>(
                                      <li style={{height:'auto',width:'fit-content',padding:"3px 4px",background: "#059fe2",display:index == 0 && item.brand != "" && item.brand != undefined ? 'inline-block' : 'none'}}>
                                        <a href="javascript:void(0)" style={{color:"#fff"}}>
                                          {item.brand}
                                        </a>
                                      </li>
                              
                                 ) )}
                                {/* <li style={{ background: "#059fe2" }}><a style={{ color: "white" }} href="javascript:void(0)">l</a></li> */}
                                </ul>
                              </div>
                            </div>
                      ) )}

{Data23.map((item,index)=>(
                            <div className="productdetailcontainer customwidth" style={{display:index == 0 && item.color != "" && item.color != undefined && item.color != undefined ? "block" : "none"}}>
                              <h6 className="product-title">color</h6>
                              <div className="color-selector inline">
                                <ul>
                                  {Data23.map((item,index)=>(
 <li >
 <div className="color-4" style={{ display:'block',background: `${item.color}`,padding :showoption == index ? `19px 19px` : `15px 15px`}} onClick={()=>{setshowoption(index)}} ></div>
</li>
                                  ))}



{/* 
{Data23.map((item, index) => {
        // Check if the color has been encountered before
        const isDuplicate = Data23.findIndex((colorItem, i) => i < index && colorItem.color === item.color) !== -1;

        // If not a duplicate, render the color
        if (!isDuplicate) {
          return (
            <li key={index}>
              <div className="color-4" style={{ display: 'block', background: `${item.color}` }}></div>
            </li>
          );
        }

        // If duplicate, don't render anything
        return null;
      })} */}

                                </ul>
                              </div>
                            </div>                      
                         ) )}
                        
                        {Data23.map((item,index)=>(
                            <div className="productdetailcontainer customwidth" style={{display:index == 0 && item.size != "" && item.size != undefined && item.size != undefined && item.size != 0 ? "block" : "none"}}>
                              <h6 className="product-title mt-2">
                                Available Size
                              </h6>
                              <div className="size-box">
                                <ul>
                                {Data23.map((item,index)=>(
                                      <li style={{ background: showoption == index ? "#059fe2" : "#fff" }} > 
                                        <a href="javascript:void(0)" style={{ color: showoption == index ? "white" : "#333" }} onClick={()=>{setshowoption(index)}}>
                                          {item.size}
                                        </a>
                                      </li>
                              
                                 ) )}
                                {/* <li style={{ background: "#059fe2" }}><a style={{ color: "white" }} href="javascript:void(0)">l</a></li> */}
                                </ul>
                              </div>
                            </div>
                             ) )}

{Data23.map((item,index)=>(
                            <div className="productdetailcontainer customwidth" style={{display:index == 0 && item.weight != "" && item.weight != undefined && item.weight != undefined && item.weight != 0 ? "block" : "none"}}>
                              <h6 className="product-title mt-2">
                                Available Weight
                              </h6>
                              <div className="size-box">
                                <ul>
                                {Data23.map((item,index)=>(
                                      <li style={{ background: showoption == index ? "#059fe2" : "#fff",width:'fit-content',display:'inline-block ',padding:'0px 3px' }} > 
                                        <a href="javascript:void(0)" style={{ color: showoption == index ? "white" : "#333" }} onClick={()=>{setshowoption(index)}}>
                                          {item.weightandtype}
                                        </a>
                                      </li>
                              
                                 ) )}
                                {/* <li style={{ background: "#059fe2" }}><a style={{ color: "white" }} href="javascript:void(0)">l</a></li> */}
                                </ul>
                              </div>
                            </div>
                          ) )}

                          <div className="productdetailcontainer customwidth">
                            <h6 className="product-title mt-3">quantity</h6>
                            <div
                              className="qty-box gap"
                              style={{
                                width: "100%",
                                justifyContent: "start",
                                flexDirection:'column',
                                alignItems:'start',
                                gap:"20px"
                                
                              }}
                            >
                              <div className="input-group">
                                <button
                                  type="button"
                                  onClick={() => {
                                    incrementcart();
                                  }}
                                >
                                  <i
                                    className="fa-solid fa-plus"
                                    style={{ color: "#059fe2" }}
                                  />
                                </button>
                                <input
                                  className="qty-adj form-control"
                                  type="number"
                                  style={{ width: "44px" }}
                                  readOnly
                                  value={qty}
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    decrementcart();
                                  }}
                                >
                                  <i
                                    className="fa-solid fa-minus"
                                    style={{ color: "#059fe2" }}
                                  />
                                </button>
                              </div>
                              {/* <span style={{display: 'flex',}}> */}
                              {/* <h6 className="product-title"></h6> */}
                              <div className="product-buttons">
                                <a
                                onClick={()=>{checktoken ? addtocartfun() : nvg('/login')}}
                                  href="javascript:void(0) "
                                  style={{
                                    background: "#059fe2",
                                    padding: "12px 9px",
                                    marginLeft:'0px'
                                  }}
                                  id="cartEffect"
                                  className="btn cart-btn btn-normal tooltip-top"
                                  data-tippy-content="Add to cart"
                                >
                                 <i className="fa fa-shopping-cart" />
                                  add to cart
                                </a>
                               
                              </div>
                              {/* </span> */}
                            </div>
                          </div>

                          <div
                            className="productdetailcontainer w-lg-50 w-xs-100 d-flex"
                            style={{
                              flexDirection: "column",
                              alignItems: "end",
                              justifyContent: "center",
                              marginTop: "10px",
                            }}
                          >
                           
                          </div>

                          <div className="productdetailcontainer w-100">
                            <h5 className="product-title ">Description</h5>
                            <p style={{ color: "#8F9091", fontSize: "12px" }}>
                              {Data23?.[showoption]?.sort_description}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        className="product-right "
                        style={{
                          marginTop: "20px",
                          boxShadow: "0px 14px 40px 0px rgba(0, 0, 0, 0.12)",
                          borderRadius: "10px",
                          padding: "20px 17px",
                        }}
                      >
                        <div
                          id="selectSize"
                          className="pro-group addeffect-section product-description border-product d-flex"
                          style={{
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                          }}
                        >
                          <div className="productdetailcontainer w-100">
                            <h5 className="product-title ">Product Details</h5>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: Data23?.[showoption]?.description,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
           <Footer />
    </>
  );
}

export default Productdetails;
