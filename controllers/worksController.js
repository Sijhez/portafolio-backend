// brong out Work models:
const Work = require ('../models/Work.js')

//get my works:
exports.getMyWorks = async (req, res) =>{
    const allWorks = await Work.find({}) 
   //verify if there's any work created 
    allWorks.length > 0 ? 
    res.json({
        msg:'Trabajos encontrados',
        data:allWorks
    }) :

    res.status(500).json({
        msg:'No se han creado trabajos aún'
    })  

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