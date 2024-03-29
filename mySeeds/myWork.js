const mongoose =  require('mongoose')

const Work = require('../models/Work')

mongoose.connect('mongodb://localhost:27017/myPortfolio',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const work = [{
    titulo:'app senderismo',
    descripcion:'una app para hacer senderismo amateur',
    tecnologias:['mongoDB','handlebars','expressjs', 'javascript'],
    imagen1:'https://i.postimg.cc/B6d9jGkR/index.jpg',
},
{
    titulo:'MediaArt',
    descripcion:'Red social para vender y promover arte emergente',
    tecnologias:['mongoDB','reactjs','expressjs', 'javascript','node','html','css'],
    imagen1:'https://i.postimg.cc/B6d9jGkR/index.jpg',
}]

const createWork = async()=>{
    const myWork = await Work.create(work)
    console.log('trabajo creado', myWork)
    mongoose.connection.close()
}

createWork();