const mongoose=require("mongoose")

const userSchema = mongoose.Schema(
    {
      first_name: {
        type: String,
        required: true,
      },
      last_name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: [true,"email is Required"],
        unique: [true,"already in database"],
      },
      mobile: {
        type: String,
        required: [true,"mobile is Required"],
        unique: [true,"already in database"],
      },
      dob: {
        type: Date, // Assuming the date of birth is a Date type
        required: false,
      },
      status: {
        type: String,
        default:"Active"
      },
      password: {
        type: String,
        required: true,
      },
      isAdmin: {
        type: String,
        default: "Inactive",
      },
    },
    {
      timestamps: true,
    }
  );

  const Usertable=mongoose.model("Usertable",userSchema);
  module.exports=Usertable;