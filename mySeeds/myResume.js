//import mongoose
const mongoose = require('mongoose')
//import model
const Profile = require('./../models/Profile')
//data base connection to seeding my information on the first profile:
mongoose.connect('mongodb://localhost:27017/portfolio',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// information to fill up profile model:

const sinuhe = [{
    nombre:"Sinuhé Jardínez Hernández",
    edad:29,
    educacion1:"Universidad Autónoma Metropolitana UAM - Azcapotzalco",
    foto:" https://i.ibb.co/Qc1px4c/Mifoto-100.jpg",
    descripcion: "hola mundo",
    socialMedia1:"https://www.linkedin.com/in/sinuhe-jardinez-hdez/",
    socialMedia2:"https://www.facebook.com/SiJHez",
    socialMedia3:"https://www.instagram.com/sinuhe.jh",
    email:"sinuhe.jh@gmail.com"
}]

const createResume = async()=>{
    const myResume = await Profile.create(sinuhe)
    console.log('CV creado:', myResume)
    mongoose.connection.close()
}
createResume();