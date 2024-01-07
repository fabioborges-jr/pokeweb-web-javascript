// Variables
const avatarElement=document.getElementById("avatar")

// Functions
function getPlayerData(){
    return fetch("/player")
    .then((res)=>res.json())
    .then((data)=>data.player)
    .catch((error)=>console.error(error))
}

function insertAvatar(){
    getPlayerData()
    .then((player)=>{
        avatarElement.innerHTML=`<img class="avatarImage" src="https://cdn.discordapp.com/avatars/${player.userIdDiscord}/${player.avatar}.png" alt="">`
    })
    .catch((error)=> console.error(error))
}

// Init
insertAvatar()
