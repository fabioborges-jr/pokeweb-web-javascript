const CLIENT_ID="1183424074031046656"
const REDIRECT_URI="http://localhost:3000/callback"


document.getElementById("discord-login").addEventListener("click", ()=>{
    window.location.href=`https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=identify%20email`
})