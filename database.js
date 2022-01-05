import mongoose from 'mongoose'

export const Database = async()=>{
   try {
    await mongoose.connect(process.env.db,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.log("Connected to mongodb successfully")
   } catch (error) {
    console.log(error)
       
   }
}