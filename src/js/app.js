// Variables
const avatarElement=document.getElementById("avatar")
const pokeballElement=document.getElementById("buttonGetPokemon")

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
    let newPokemon
    fetch("/catchnewpokemon")
        .then((res)=>res.json())
        .then((data)=>data.newPokemon)
        .then((newPokemon)=>{pokeballElement.innerHTML=`<img class="pokemonImage" src="${newPokemon.sprite}" alt="">`})
        .catch((error)=>console.error(error))
}

// Init
insertAvatar()

// Events
pokeballElement.addEventListener("click", getNewPokemon)