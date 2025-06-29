import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { tokenstore } from "../../Localstorage/Store";
import { Registerform } from "./Validation/Registerform";
import { usePostCreateUserMutation } from "../../store/api/userapi";

const Registersection = () => {
  const nvg = useNavigate();
  const [createuser] = usePostCreateUserMutation();
  const [successMessage, setSuccessMessage] = useState("");
  const [clientRegisterErrors, setClientRegisterErrors] = useState(null);

  const registerform = async (value, setFieldError) => {
    try {
      const response = await createuser(value);

      if (response?.data?.status === "successfull") {
        tokenstore(response.data.token);
        setSuccessMessage("Registration successful! Redirecting...");
        setTimeout(() => {
          nvg("/home");
        }, 2000);
      } else if (response?.error?.data?.errors) {
        const err = response.error.data.errors;
        if (err?.keyValue?.email) {
          setFieldError("email", "Email already registered.");
        }
        if (err?.keyValue?.mobile) {
          setFieldError("mobile", "Mobile already registered.");
        }
      } else {
        setClientRegisterErrors("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setClientRegisterErrors("Registration failed due to an unexpected error.");
    }
  };

  return (
    <div className="album py-1">
      {/* ✅ Success message */}
      {successMessage && (
        <p style={{ color: "green", textAlign: "center", marginBottom: "15px" }}>
          {successMessage}
        </p>
      )}
      {/* ❌ General registration errors */}
      {clientRegisterErrors && (
        <p style={{ color: "red", textAlign: "center", marginBottom: "15px" }}>
          {clientRegisterErrors}
        </p>
      )}

      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          mobile: "",
          password: "",
          dob: "",
        }}
        validationSchema={Registerform}
        onSubmit={(values, { setFieldError }) => {
          registerform(values, setFieldError);
        }}
      >
        {({ values, errors, handleSubmit, touched }) => (
          <Form autoComplete="off" className="form-login" onSubmit={handleSubmit}>
            <label>First Name</label>
            <Field
              type="text"
              name="first_name"
              className="login-input mb-0"
              placeholder="Enter your First Name"
            />
            {errors.first_name && touched.first_name && (
              <p style={{ color: "red", marginBottom: "20px" }}>{errors.first_name}</p>
            )}

            <label>Last Name</label>
            <Field
              type="text"
              name="last_name"
              className="login-input mb-0"
              placeholder="Enter your Last Name"
            />
            {errors.last_name && touched.last_name && (
              <p style={{ color: "red", marginBottom: "20px" }}>{errors.last_name}</p>
            )}

            <label>Mobile No.</label>
            <Field
              type="text"
              name="mobile"
              className="login-input mb-0"
              placeholder="Enter your Mobile No"
            />
            {errors.mobile && touched.mobile && (
              <p style={{ color: "red", marginBottom: "20px" }}>{errors.mobile}</p>
            )}

            <label>Email</label>
            <Field
              type="email"
              name="email"
              className="login-input mb-0"
              placeholder="Enter your Email"
            />
            {errors.email && touched.email && (
              <p style={{ color: "red", marginBottom: "20px" }}>{errors.email}</p>
            )}

            <label>Date of Birth</label>
            <Field
              type="date"
              name="dob"
              className="login-input mb-0"
            />
            {errors.dob && touched.dob && (
              <p style={{ color: "red", marginBottom: "20px" }}>{errors.dob}</p>
            )}

            <label>Password</label>
            <Field
              type="password"
              name="password"
              className="login-input mb-0"
              placeholder="Enter your Password"
            />
            {errors.password && touched.password && (
              <p style={{ color: "red", marginBottom: "20px" }}>{errors.password}</p>
            )}

            <button type="submit" className="btn" id="myForm">
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registersection;
