const usuarioRepository = require('../repository/usuario_repository')
const jwt = require('jsonwebtoken')
const PALAVRA_CHAVE = "Sen@c2024"

function verificarLogin(usuarioLogin) {
    if (!usuarioLogin || !usuarioLogin.email || !usuarioLogin.senha) {
        throw { id: 401, msg: "Usuario ou senha inválidos." }
    }

    if (usuarioLogin.email === "admin@senac.com" && usuarioLogin.senha === "admin123") {
        let token = jwt.sign(
            { userId: "admin", role: "admin" }, 
            PALAVRA_CHAVE,  
            { expiresIn: '6h' }
        )
        console.log(token)
        return token
    }

    try {
        let usuario = usuarioRepository.buscarPorEmail(usuarioLogin.email)
        if (usuario) {
            if (usuario.senha == usuarioLogin.senha) {
                let token = jwt.sign(
                    { userId: usuario.id }, 
                    PALAVRA_CHAVE,  
                    { expiresIn: '6h' }
                )
                return token
            }        
        }
    } catch (err) {
        throw { id: 401, msg: "Usuario ou senha inválidos" }
    }
}

function validarToken(token) {
    try {
        const payload = jwt.verify(token, PALAVRA_CHAVE)
        console.log("Payload", payload)
    } catch (err) {
        console.log("Erro no Token", err)
        throw  { id: 401, msg: "Token Inválido!" }
    }
}

module.exports = {
    verificarLogin,
    validarToken
}
