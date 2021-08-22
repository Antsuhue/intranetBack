const modelUser = require("../model/user")

async function createUser(req,res){
    const body = req.body
    const user = await modelUser.findOne({"name":body.name.toLowerCase()})
     
    console.log(user);

    if (user){
        return res.status(400).json({"status":"Nome de usuário já existe"})
    }

    // try {
    await modelUser.create({
        "name":body.name.toLowerCase(),
        "pass":body.pass
    })
        return res.status(200).json({"status":"ok"})
    // }catch(err){
    //     code  = err.code
    //     if (code == 11000){
    //         return res.status(400).json({"status":"Usuario já existe"})
    //     }

    // }
}

async function searchUser(req,res){
    const body = req.body

    if (body.name.trim() == ""){
        if (body.pass.trim() == ""){
            return res.status(400).json({"status":"campos de usuario e senha vazios!"})
        }
        return res.status(400).json({"status":"campo de usuario está vazio!"})
    }
    if (body.pass.trim() == ""){
        return res.status(400).json({"status":"campo de senha vazio!"})
    }

    const user = await modelUser.findOne({"name":body.name.toLowerCase()}, (err,response) => {
        if (err){ 
            console.log("Chegou")
            return console.log(err);
        }else{
            
            if (response == null){
                return res.status(400).json({"status":"Usuario " +body.name+  " não existe!"})
            }
            if (body.pass == response.pass){
                return res.status(200).json(response)
            }else{
                return res.status(400).json({"status":"Senha está incorreta!"})
            }
        }
    })


}

module.exports = { createUser, searchUser }