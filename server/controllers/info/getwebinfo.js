const website_info=require('../../Models/website_info')

const getwebinfo=async(req,res)=>{
    try {
        const webinfo=await website_info.find()
        res.send({status:"sucessfull",data:webinfo})
    } catch (error) {
        console.log(`here is ${error}`)
        res.send({status:"failed",error:error})
    }
}
module.exports=getwebinfo