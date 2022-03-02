//imports mongoose
const mongoose = require("mongoose")
//Loggin profile to edit my works and information
//schema
const userSchema = mongoose.Schema({
    
    nombre:{
       type:String,
       required:true
   },
   email:{
       type:String,
       required:[true, "Tu email es requerido"],
       match: [/^\S+@\S+\.\S+$/, "Por favor, ingresa un email válido."]

   },
   password:{
       type:String,
       required:true
   }
   })

   const User = mongoose.model('User', userSchema)

   module.exports= User