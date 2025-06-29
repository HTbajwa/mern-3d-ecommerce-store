import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { Loginuser } from "./Validation/Loginuser";
import { useNavigate } from "react-router-dom";
import { tokenstore } from "../../Localstorage/Store";
import { usePostLoginUserMutation } from "../../store/api/userapi";

const Loginsection = () => {
  const [clientloginerrors, setclientloginerrors] = useState(null);
  const nvg = useNavigate();

  const [loginuser] = usePostLoginUserMutation();

  // client login api start here
  const loginform = async (value, setFieldError) => {
    try {
      const response = await loginuser(value);
      if (response?.data?.status == "successfull") {
        tokenstore(response.data.token);
        nvg("/home");
        // window.location.reload();
      } else {
        if (response.error.data.message) {
          setclientloginerrors(response.error.data.message);
        }
      }
    } catch (error) {}
  };
  // client login api end here

  return (
    <div className="album py-1">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Loginuser}
        onSubmit={(values, { setFieldError }) => {
          loginform(values, setFieldError);
        }}
      >
        {({ values, errors, handleSubmit, touched, setFieldValue }) => (
          <Form
            autoComplete="off"
            className="form-login"
            onSubmit={handleSubmit}
          >
            <label htmlFor="text">Email Id</label>

            <Field
              type="email"
              name="email"
              className="login-input mb-0"
              placeholder="Enter your Email"
              value={values.email}
            />
            <span
              style={{
                display: "block",
                marginBottom: "20px",
              }}
            >
              {" "}
              {errors.email && touched.email ? (
                <p style={{ color: "red" }}>{errors.email}</p>
              ) : null}
            </span>
            <label htmlFor="text">Password</label>
            <Field
              type="password"
              name="password"
              className="login-input mb-0"
              placeholder="Enter your password"
              value={values.password}
            />
            <span
              style={{
                display: "block",
                marginBottom: "20px",
              }}
            >
              {" "}
              {errors.password && touched.password ? (
                <p style={{ color: "red" }}>{errors.password}</p>
              ) : null}
            </span>
            <div className="login-sub">
              <div className="remember">
                <input
                  className="form-check-input m-2"
                  type="checkbox"
                  defaultValue
                  id="flexCheckDefault"
                />
                <p>Remeber me</p>
              </div>
              <div>
                <p>Forgot password?</p>
              </div>
            </div>

            <button type="submit" className="btn" id="myForm">
              login
            </button>
            <span
              style={{
                color: "red",
                textAlign: "center",
                display: "block",
                marginTop: "3px",
                fontSize: "15px",
              }}
            >
              {clientloginerrors !== null ? clientloginerrors : ""}
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Loginsection;
