import React from "react";
import img from "../assets/qwerty.png";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { FaBell, FaCog, FaEuroSign, FaSignature, FaUserAlt } from "react-icons/fa";
import { getsoh, gettoken, removeToken,getinfo } from "../Localstorage/Store";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineDown } from "react-icons/ai";
import img2 from "../assets/Ecomus.svg";
import { useContactlistlatestQuery } from "../store/api/webinfoapi";

const Header = () => {
  const navigate = useNavigate();
  const userInfo = getinfo();
  const logoutHandler = () => {
    removeToken();
    navigate("/");
  };

  const sshh = getsoh();
  const { data: userData, isLoading } = useContactlistlatestQuery();

  return (
    userInfo && (
      <nav className="navbar navbar-expand-lg bg-info  px-4 py-2">
        <div className="d-flex align-items-center">
          {!sshh && <img src={img2} alt="Logo" className="img-fluid me-3" style={{ height: '30px' }} />}
        </div>
        <div className="d-flex align-items-center ms-auto">
          {/* Notifications */}
          <div className="dropdown me-3">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="notificationDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <BsFillEnvelopeFill />
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="notificationDropdown">
              <li className="dropdown-header">Notifications</li>
              <hr className="dropdown-divider" />
              {!isLoading && userData?.data?.map((item, index) => (
                <li key={index} className="dropdown-item d-flex align-items-start">
                  <img src={img} alt="" className="rounded me-2" style={{ width: '30px', height: '30px' }} />
                  <div>
                    <strong>{item.firstname} {item.lastname}</strong>
                    <div className="small text-muted">
                      {item.Message.length > 40 ? `${item.Message.substring(0, 40)}...` : item.Message}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Icons */}
          {/* <div className="me-3">
            <FaBell size="19px" className="text-white" />
          </div> */}

          {/* User Menu */}
          <div className="dropdown">
            <button className="btn btn-outline-light dropdown-toggle d-flex align-items-center" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <img src={img} alt="User" className="rounded-circle me-2" style={{ width: '30px', height: '30px' }} />
              <span>{userInfo?.first_name} {userInfo?.last_name}</span>
              <AiOutlineDown className="ms-1" />
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li className="dropdown-item">
                <NavLink to="/profiledetail" className="text-decoration-none text-dark d-flex align-items-center">
                  <FaUserAlt className="me-2" /> View Profile
                </NavLink>
              </li>
              {/* <li className="dropdown-item">
                <NavLink to="/accountpassword" className="text-decoration-none text-dark d-flex align-items-center">
                  <FaCog className="me-2" /> Account Settings
                </NavLink>
              </li>
              <li className="dropdown-item">
                <NavLink to="/logactivity" className="text-decoration-none text-dark d-flex align-items-center">
                  <FaSignature className="me-2" /> Login Activity
                </NavLink>
              </li> */}
              <hr className="dropdown-divider" />
              <li className="dropdown-item text-danger" onClick={logoutHandler}>
                <FaEuroSign className="me-2" /> Log Out
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  );
};

export default Header;
