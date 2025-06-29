import * as Yup from "yup";

export const address = Yup.object({
  first_name: Yup.string()
    .label("First Name")
    .matches(/^[A-Za-z\s]+$/, "First name must contain only letters")
    .min(2, "Too short")
    .max(50, "Too long")
    .required("Please enter first name"),

  last_name: Yup.string()
    .label("Last Name")
    .matches(/^[A-Za-z\s]+$/, "Last name must contain only letters")
    .min(2, "Too short")
    .max(50, "Too long")
    .required("Please enter last name"),

  address1: Yup.string()
    .label("Address 1")
    .min(5, "Too short")
    .max(100, "Too long")
    .required("Please enter address 1"),

  address2: Yup.string()
    .label("Address 2")
    .min(5, "Too short")
    .max(100, "Too long")
    .required("Please enter address 2"),

  country: Yup.string()
    .label("Country")
    .matches(/^[A-Za-z\s]+$/, "Country name must contain only letters")
    .min(2, "Too short")
    .max(56, "Too long")
    .required("Country is required"),

  state: Yup.string()
    .label("State")
    .matches(/^[A-Za-z\s]+$/, "State must contain only letters")
    .min(2, "Too short")
    .max(50, "Too long")
    .required("State is required"),

  city: Yup.string()
    .label("City")
    .matches(/^[A-Za-z\s]+$/, "City must contain only letters")
    .min(2, "Too short")
    .max(50, "Too long")
    .required("City is required"),

  pincode: Yup.string()
    .label("PinCode")
    .matches(/^\d{6}$/, "Pincode must be exactly 6 digits")
    .required("Pincode is required"),

  mobile: Yup.string()
    .label("Mobile No")
    .matches(/^0\d{10}$/, "Mobile number must be 11 digits and start with 0")
    .required("Mobile number is required"),
});
