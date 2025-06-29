import * as Yup from "yup";

export const Clientlogin = Yup.object({
  email: Yup.string()
    .label("Email Address")
    .trim()
    .email("Invalid Email Address")
    .max(50, "Email is too long")
    .required("Email is required"),

  password: Yup.string()
    .label("Password")
    .trim()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .required("Password is required"),
});
