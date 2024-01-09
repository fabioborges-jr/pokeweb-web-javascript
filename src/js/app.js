// Variables
const avatarElement=document.getElementById("avatar")
const pokeballElement=document.getElementById("pokeball")

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

function getNewPokemon(){
    fetch("/catchnewpokemon")
        .then((res)=>res.json())
        .then((data)=>console.log(data.newPokemon))
}

// Init
insertAvatar()


pokeballElement.addEventListener("click", getNewPokemon)