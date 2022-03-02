
const bcryptjs = require ('bcryptjs')
const jwt = require("jsonwebtoken")
const User = require('../models/User')

exports.home = async (req, res)=>{
    res.send('Bienvenido al home')
    
}

// create super user,password save in DB and token generates

exports.createSuperUser = async(req, res)=>{
    const {
        nombre,
        email,
        password
    } = req.body

const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    if(!regex.test(password)){
    return res.status(500).json({
        msg: "El password debe contener 6 caracteres minimo, un numero y una mayúscula."
          })
          
        }

//validate form:
const verifyEmail = email.includes("@")

if(!verifyEmail){
    return res.status(500).json({
        msg: "Correo inválido."
    })
}

if(!nombre || !email || !password){
    return res.status(500).json({
        msg: "Usuario sin generar."
    })
}

const oneUser = await User.find({})
if(oneUser.length>0){
   return res.json({
        msg:"Ya existe un super usuario"
    })
}
    
    try {
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = await User.create({
            nombre,
            email,
            password:hashedPassword
        })
        const payload = {
            user:{
                id:newUser._id //atrapamos id del newUser generado para firmar token
            }
        }
         
    //firma con jsonwebtoken
    jwt.sign(
        payload, process.env.SECRET,{
            expiresIn:360000 
        }, (error, token)=>{
            if(error) throw error
            res.json({
                msg: "Token correctamente generado.",
                data: token
            })
    })
    //SE GENERA USUARIO A TRAVÉS DE UN TOKEN QUE HAY QUE DESCIFRAR PARA USAR

    } catch (error) {
    res.status(500).json({
        msg: "El usuario no se generó correctamente",
        error:error
    })
      }

   
}

//Login super user
exports.loginSuperUser = async(req, res)=>{
    const {email,password} = req.body
    try {
        const foundMyUser = await User.findOne({email})
        //no foundUser:
        if(!foundMyUser){
            return res.status(400).json({
                msg:"El usuario o contraseña son incorrectos"
            })
        }
        //if there's super user, compare password with DB password
        const verifyPassword = await bcryptjs.compare(password, foundMyUser.password)
        //if both passwords doesn't match:
        if(!verifyPassword){
            return res.status(400).json({
                msg:"El usuario o contraseña no coinciden"
            })
        }
      
        //if there's super user and passwords are matched, generate token:
        const payload = {
            user:{
                id:foundMyUser._id
            }
        }
        jwt.sign(
            payload,process.env.SECRET,{
                expiresIn:360000
            },//if there's error, throw it:
            (error,token)=>{
                if(error) throw error
                res.json({
                    msg:"Inicio de sesión correcto.",
                    data:token
                })
            }
           )
        return
    } catch (error) {
        res.json({
            msg:"No se inicio sesión. Intenta de nuevo.",
            data:error
        })
        console.log(error)

    }
}

//verify token to be in restricted areas:

exports.verifyToken = async(req, res)=>{
    //decode token:
    try {
        const foundMyUser = await User.findById(req.user.id).select('-password')
        res.json({
            msg:"Token verificado correctamente",
            data:foundMyUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:"Token fallido: no puedes acceder",
            data:error
        })
        
    }
}