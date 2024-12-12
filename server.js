const express=require('express')
const mongoose= require('mongoose')
const BrandName=require('./model')
const app=express()

app.use(express.json())


// app.get('/',(req,res)=>{
//     res.send("<h1>Hello World<h1>")
// })
mongoose.connect('mongodb+srv://prakashkomati:SURYA@cluster0.r5z5mbl.mongodb.net/',{useUnifiedTopology:true,useNewUrlParser:true})

.then(()=>
    console.log("DB CONNECTED")
)
.catch(err=>{
    console.log("error",err)
})

app.post('/addbrands',async(req,res)=>{
    const {brandname}=req.body;
    try{
        const newData=new BrandName({brandname});
        await newData.save()
        return res.status(200).json(await BrandName.find())

    }
    catch(err){
        console.log(err.message)
    }
         
    }
)

app.get('/allbrands',async(req,res)=>{
    try{
        const alldata=await(BrandName.findOne())
        return res.json(alldata)
}
    catch(err){
        console.log(err.message)

    }

    }
)

app.get('/allbrands/:id',async(req,res)=>{
    try{
        const data=await BrandName.findById(req.params.id)
        return res.json(data)
}
    catch(err){
        console.log(err.message)

    }

    }
)
app.delete('/deletebrands/:id',async(req,res)=>{
    try{
        await BrandName.findByIdAndDelete(req.params.id);
        return res.json(await BrandName.find())
    }
    catch(err){
        console.log(err.message)
    }
})






app.listen(3000,()=>{
   console.log("Server runnig")
})