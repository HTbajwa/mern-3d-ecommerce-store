import Footer from "../../components/Footer";
import "../../css/login.css";
import { useState } from "react";
import Loginsection from "./Loginsection";
import Registersection from "./Registersection";
import Header from "../../components/Header/Header";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <>
      <Header />
      <section
        className="login-page bg-body marginfromtop"
        style={{ width: "100%" }}
      >
        <div
          className="container"
          style={{
            background: "white",
            marginTop: "50px",
            paddingBottom: "76px",
          }}
        >
          <div className="row align-items-center g-5 pt-5">
            <div className="col-lg-6 offset-md-3">
              <div className="container newpadding hidepadding">
                <div className="card p-1" style={{ border: "none" }}>
                  <img
                    src="/images/Ecomus.svg"
                    className="login-tabs-img"
                    style={{ width: "200px", marginBottom: "30px" }}
                    alt="Ecomus Logo"
                  />
                  <nav>
                    <div
                      className="nav nav-tabs"
                      style={{ justifyContent: "center" }}
                      role="tablist"
                    >
                      <button
                        className={`nav-link ${activeTab === "login" ? "active" : ""}`}
                        type="button"
                        onClick={() => setActiveTab("login")}
                      >
                        Login
                      </button>
                      <button
                        className={`nav-link ${activeTab === "register" ? "active" : ""}`}
                        type="button"
                        onClick={() => setActiveTab("register")}
                      >
                        Register
                      </button>
                    </div>
                  </nav>

                  <div className="tab-content p-2">
                    {activeTab === "login" && (
                      <div className="tab-pane active show">
                        <Loginsection />
                      </div>
                    )}
                    {activeTab === "register" && (
                      <div className="tab-pane active show">
                        <Registersection />
                      </div>
                    )}
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
};

export default Login;
