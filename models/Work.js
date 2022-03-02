//mongoose imports:
const mongoose = require('mongoose')

//schema works
const worksSchema = mongoose.Schema({
    titulo:String,
    descripcion:String,
    tecnologias:[],
    imagen1:String,
    imagen2:String,
    imagen3:String,
    imagen4:String,
    imagen5:String
})

const Work = mongoose.model('Work', worksSchema)

module.exports = Work