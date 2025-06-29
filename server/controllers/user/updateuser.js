const Usertable = require("../../Models/usertable");

const updateuser=async (req,res)=>{
try {
    const userId=req.params.id;
    console.log('Request body:', req.body); 
    const updateuser=await Usertable.findByIdAndUpdate(userId,req.body,{new:true})
    console.log(updateuser);
    if (!updateuser) {
        return res.status(404).json({ status: "failed user update", message: "User not found" });
      }
  
      res.json({ status: "successfully update", data: updateuser});
    }

 catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ status: "failed", errors: error.message });
}
}

module.exports=updateuser