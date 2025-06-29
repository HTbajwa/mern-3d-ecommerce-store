const mongoose=require("mongoose")

const connectdb=(con)=>{
    return mongoose.connect(con).then(()=>{
        console.log("connection successfull")
    }).catch((err)=>{
        console.log("database err",err)
    })
}

module.exports=connectdb