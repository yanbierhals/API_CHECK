const loginService = require("../service/login_service")

function verificarAcesso(req, res, next) {
    try {
        console.log(1)
        // Recupera o cabeçalho Authorization
        const authHeader = req.get("Authorization");

        console.log('Auth Header', authHeader) 
        // Verifica se o cabeçalho Authorization está presente e começa com "Bearer "
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "Token não fornecido ou formato incorreto. Esperado: Bearer <token>" });
        }

        // Extrai o token do cabeçalho
        const token = authHeader.split(" ")[1];  // Pega o valor após "Bearer"
        console.log(token)
        // Chama o método para validar o token (verificando sua validade)
        loginService.validarToken(token);

        // Se o token for válido, continua a execução para a próxima rota
        next();
    } catch (err) {
        // Em caso de erro (por exemplo, token inválido ou outro erro), retorna um erro 401
        res.status(err.id || 401).json(err);
    }
}

module.exports = {
    verificarAcesso
}