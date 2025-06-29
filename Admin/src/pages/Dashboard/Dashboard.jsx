import React from "react";
import { useGetAllOrderQuery } from "../../store/api/orderapi";
import img1 from "../../assets/Ellipse 27.png";
import img2 from "../../assets/Ellipse 28.png";
import img3 from "../../assets/Ellipse 29.png";
import Breadcupdash from "../../components/Breadcupdash";
import Header from "../../components/Header";
import { useGetAllUsersQuery } from "../../store/api/userapi";

const Dashboard = () => {
  const { data, error, isLoading } = useGetAllOrderQuery();
  const { data: userdata, error: usererror, isLoading: itisLoading } = useGetAllUsersQuery(); // Make sure to destructure 'data' as 'userdata'
  
  console.log(userdata)
  // Ensure data is valid before slicing it
  const latestOrders = data?.data?.slice(0, 10) || [];
  
  // Assuming `data` has keys like userCount, categoryCount, orderCount
  const userCount = userdata?.userCount || 0;
  const categoryCount = data?.categoryCount || 0;
  const orderCount = data?.orderCount || 0;

  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      <div className="dashboardcontent">
        <Breadcupdash name={"Dashboard"} />
        <div className="container-fuild py-4" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
          
          <div className="row mt-3 mx-1">
            <div className="col-lg-6 col-12 dbox rounded my-lg-0 my-2 bg-white specailshow">
              <div className="row">
                <div className="col-12 dtext py-2">10 Latest Users</div>
                <div className="col-12 px-2">
                  <div className="underline"></div>
                </div>
              </div>
              <div className="headtb special">
                <div className="sno" style={{ position: "relative", left: "8px" }}>Full Name</div>
                <div className="companylogo">Mobile</div>
                <div className="amount">Email</div>
              </div>
              {userdata?.data?.slice(0, 10)?.map((item, index) => ( // Adjusted based on your data structure
                <div className="headtb" key={index}>
                  <div className="sno px-3">{`${item.first_name} ${item.last_name}`}</div>
                  <div>{item.mobile}</div>
                  <div className="amount">{item.email}</div>
                </div>
              ))}
            </div>
            <div className="col-lg-6 col-12 dbox">
              <div className="row rounded bg-white ">
                <div className="col-12 d-flex justify-content-between">
                  <div className="dtext py-2">10 Latest Orders</div>
                  <div className="lastlo d-flex py-2" style={{ gap: "7px" }}></div>
                </div>
                <div className="col-12 px-2 ">
                  <div className="underline"></div>
                </div>
                <div className="headtb special">
                  <div className="sno" style={{ position: "relative", left: "20px" }}>Order ID</div>
                  <div className="companylogo" style={{ position: "relative", left: "50px" }}>Order Status</div>
                  <div className="amount">Amount</div>
                </div>

                {latestOrders.map((item, index) => (
                  <div className="headtb" key={index}>
                    <div className="sno px-3">{item.orderid}</div>
                    <div className="companylogo">{item.order_status}</div>
                    <div className="amount">Pkr {item.grand_total_amount}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
