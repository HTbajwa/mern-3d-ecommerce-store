import * as Yup from "yup";

const nameRegex = /^[a-zA-Z\s-]+$/;
const messageRegex = /^[a-zA-Z0-9\s.,!?'"()-]+$/;
const mobileRegex = /^0\d{10}$/;

export const contactvalidation = Yup.object({
  name: Yup.string()
    .label("First Name")
    .matches(nameRegex, "Only letters, spaces, and hyphens are allowed")
    .min(2, "First Name too short")
    .max(25, "First Name too long")
    .required("Please enter first name"),

  last_name: Yup.string()
    .label("Last Name")
    .matches(nameRegex, "Only letters, spaces, and hyphens are allowed")
    .min(2, "Last Name too short")
    .max(25, "Last Name too long")
    .required("Please enter last name"),

  msg: Yup.string()
    .label("Message")
    .matches(messageRegex, "Invalid characters in message")
    .min(2, "Message too short")
    .max(200, "Message too long")
    .required("Please enter your message"),

  email: Yup.string()
    .label("Email Address")
    .trim()
    .email("Invalid email address")
    .max(45, "Email too long")
    .required("Email is required"),

  number: Yup.string()
    .label("Mobile Number")
    .matches(mobileRegex, "Mobile number must be 11 digits and start with 0")
    .required("Mobile number is required"),
});
