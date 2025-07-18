import * as Yup from "yup";

export const Categoryvalidationedit = Yup.object({
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
    .label("Email ID")
    .min(2)
    .max(25)
    .email()
    .required("Please Enter Email ID"),
  mobile: Yup.string()
    .label("Mobile No")
    .min(2)
    .max(19)
    .required("Please Enter Mobile No"),
  address: Yup.string()
  .label("Address")
    .min(2)
    .max(19),
  country: Yup.string()
    .label("Country")
    .min(4)
    .required("Country is required"),
  state: Yup.string()
    .label("State")
    .min(4),
  city: Yup.string()
    .label("City")
    .min(4),
  pincode: Yup.string()
    .label("PinCode")
    .min(4)
    .required("Pincode is required"),
  status: Yup.string()
    .required("Status is required")
    .oneOf(["Active", "Inactive"], "Invalid Status"),
  type: Yup.string()
    .oneOf(["Admin", "User"], "Invalid Type"),
});
