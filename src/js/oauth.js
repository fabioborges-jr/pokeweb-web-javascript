// Importando o módulo 'http' do Node.js
require("dotenv").config()

const http = require('http');
// Importando o módulo 'url' do Node.js para manipular URLs
const url = require('url');
// Importando o módulo 'https' para fazer solicitações HTTPS
const https = require('https');
// Substitua estas variáveis com suas próprias credenciais e URLs
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI =  process.env.REDIRECT_URI
// Criando um servidor HTTP simples
const server = http.createServer((req, res) => {
  // Analisando a URL da solicitação
  const parsedUrl = url.parse(req.url, true);
    console.log(parsedUrl);
  // Rota de retorno de chamada
  if (parsedUrl.pathname === '/callback') {
    // Obtendo o código da URL
    const code = parsedUrl.query.code;

    // Configurando os detalhes da solicitação para obter o token de acesso
    const options = {
      method: 'POST',
      hostname: 'discord.com',
      path: '/api/oauth2/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    // Criando uma solicitação HTTPS
    const tokenRequest = https.request(options, (tokenRes) => {
      let data = '';

      // Capturando os dados da resposta
      tokenRes.on('data', (chunk) => {
        data += chunk;
      });

      // Manipulando a resposta completa
      tokenRes.on('end', () => {
        const tokenData = JSON.parse(data);
        // Aqui você pode lidar com os dados do token, como fazer login ou criar uma sessão.

        // Respondendo ao cliente (pode ser uma página de sucesso)
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Login Successful!</h1>');
      });
    });

    // Enviando os parâmetros da solicitação para obter o token de acesso
    tokenRequest.write(`client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT_URI}`);

    // Finalizando a solicitação
    tokenRequest.end();
  } else {
    // Rota padrão (pode ser uma página de login)
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Login Page</h1><a href="https://discord.com/api/oauth2/authorize?client_id=SEU_CLIENT_ID&redirect_uri=SUA_URL_DE_REDIRECT&response_type=code&scope=identify%20email">Login with Discord</a>');
  }
});

// Iniciando o servidor na porta 3000
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
