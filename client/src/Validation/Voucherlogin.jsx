import * as Yup from "yup";

const mobileRegex = /^0\d{10}$/;
const otpRegex = /^\d{4,6}$/; // Adjust to 4, 5, or 6 digits as needed

export const Voucherlogin = Yup.object({
  vouchercode: Yup.string()
    .label("Voucher Code")
    .min(4, "Voucher Code must be at least 4 characters")
    .max(20, "Voucher Code must not exceed 20 characters")
    .required("Voucher Code is required"),

  mobile: Yup.string()
    .label("Mobile Number")
    .matches(mobileRegex, "Mobile number must be 11 digits and start with 0")
    .required("Please enter your mobile number"),

  otp: Yup.string()
    .label("OTP")
    .matches(otpRegex, "OTP must be 4 to 6 digits")
    .required("Please enter the OTP"),
});
