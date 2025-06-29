const Usertable = require("../../Models/usertable");

const deleteuser=async(req,res)=>{
try {
   const user =await Usertable.findByIdAndDelete(req.params.id) 
   res.send({
    status:"successfully deleted",
    data:user
   })
} catch (error) {
  res.status(500).send({error: "An error occcur while deleting user"})  
}
}

module.exports=deleteuser