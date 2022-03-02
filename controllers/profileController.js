const Profile = require('../models/Profile')

//get my info
exports.getMyProfile = async(req, res)=> {
    const myProfile = await Profile.find({})
    res.json({
        msg:'Aqui mi resumen',
        data:myProfile
    })
}

exports.getMyIdProfile = async(req, res)=>{
    const{id}= req.params
    try {
        const myResume = await Profile.findById(id)
        res.json({
            msg:"Resumen encontrado",
            data:myResume
        })
    } catch (error) {
        res.status(500).json({
            msg:"Resumen extraviado",
            data:error
        })
    }
}

//edit my resume:

exports.editMyProfile = async(req, res)=>{
    const {id} = req.params
    const{
       nombre,
       edad,
       educacion1,
       descripcion,
       socialMedia1,
       socialMedia2,
       socialMedia3
    } = req.body
    try {
        const updateResume = await Profile.findByIdAndUpdate(id,
            {nombre, edad, educacion1, descripcion,socialMedia1, socialMedia2, socialMedia3},
            {new:true})
        res.json({
            msg:"Resumen actualizado",
            data:updateResume
        })
    } catch (error) {
        res.status(500).json({
            msg:"Hubo un error.",
            error:error
        })
    }
}