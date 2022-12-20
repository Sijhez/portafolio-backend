// brong out Work models:
const Work = require ('../models/Work.js')

//get my works:
exports.getMyWorks = async (req, res) =>{
   //verify if there's any work created 
   try {
    const allWorks = await Work.find({}) 
     res.json({
        msg:'Trabajos encontrados',
        data:allWorks
     })  
   } catch (error) {
     res.status(500).json({
        msg:'No se han creado trabajos aún'
   })
   }


}
//get one work:
exports.getOneWork = async (req, res) =>{
    const {idWork} = req.params
   try {
    const oneWork = await Work.findById(idWork)
    res.json({
        msg:'trabajo encontrado',
        data:oneWork
    })
  
   } catch (error) {
       res.status(400).json({
           msg:'No se encontró el trabajo',
           data:error
       })
   }
} 

//create one work:
exports.createOneWork = async(req, res) => {

    const {
        titulo,
        descripcion,
        tecnologias,
        imagen1,
    } = req.body

    //validation for empty body
    const emptyBody = (obj) => {
        for(var key in obj){
            if(obj.hasOwnProperty(key))
            return false;
        }
        return true;
    }

    if(emptyBody(req.body)){
        res.status(500)
        .json({
            msg:"esta vacio papu"
        })
        return
    }

    try {

        const newWork = await Work.create({
            titulo,descripcion,tecnologias,imagen1,
         })
         res.json({
            msg:"Trabajo creado chido",
            data:newWork
         })
    } catch (error) {
        res.status(500)
           .json({
            msg:"Algo falló papu",
            error:error
        })
    }

}