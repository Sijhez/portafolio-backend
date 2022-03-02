//mongoose imports
const mongoose = require('mongoose')

//schema my profile:
const profileSchema = mongoose.Schema({
    nombre:String,
    edad:Number,
    educacion1:String,
    educacion2:String,
    educacion3:String,
    foto:String,
    descripcion:String,
    socialMedia1:String,
    socialMedia2:String,
    socialMedia3:String,
    email:String
  })

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile