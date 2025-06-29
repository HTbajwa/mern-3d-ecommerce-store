const contact=require ('../../Models/contactus')

const contactlist=async(req,res)=>{
    try {
        const contactlisting=await contact.find()
        res.send({status:"successfull",data:contactlisting})


    } catch (error) {
        console.log(`here is ${error}`)
        res.send({status:"failed"})
    }
}

module.exports=contactlist