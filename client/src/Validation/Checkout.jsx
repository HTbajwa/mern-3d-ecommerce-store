import * as Yup from "yup";
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const mobileRegex = /^\d{10}$/;
export const checkoutvalidation = Yup.object({
  first_name: Yup.string()
    .label("First Name")
    .min(2)
    .max(19)
    .required("Please Enter First Name"),
  last_name: Yup.string()
    .label("Last Name")
    .min(2)
    .max(19)
    .required("Please Enter Last Name"),
    email: Yup.string()
    .email("Invalid email format")
    .matches(emailRegex, "Invalid email format")
    .min(2, "Email is too short")
    .max(50, "Email is too long")
    .required("Please enter email"),
  address1: Yup.string()
  .label("Address 1")
    .min(2)
    .required("Please Enter Address1"),
  address2: Yup.string()
  .label("Address 2")
    .min(2)
    ,
  country: Yup.string()
    .label("Country")
    .min(2)
    .required("Country is required"),
  state: Yup.string()
    .label("State")
    .min(2)
    .required("State is required"),
  city: Yup.string()
    .label("City")
    .min(2)
    .required("City is required"),
  pincode: Yup.string()
    .label("PinCode")
    .min(5)
    .max(6)
    .required("Pincode is required"),
    mobile: Yup.string()
    .label("Mobile No")
    .matches(mobileRegex, "Mobile number must be exactly 11 digits")
    .required("Mobile Number is required"),
});
