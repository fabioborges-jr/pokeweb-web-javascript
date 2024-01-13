// Variables
const avatarElement=document.getElementById("avatar")
const pokeballElement=document.getElementById("buttonGetPokemon")
const pokemonsListElement=document.getElementById("pokemonsListElement")


// Functions
function getPlayerData(){
    return fetch("/player")
    .then((res)=>res.json())
    .then((data)=>data.player)
    .catch((error)=>console.error(error))
}

function insertAvatarPokemons(){
    getPlayerData()
    .then((player)=>{
        avatarElement.innerHTML=`<img class="avatarImage" src="https://cdn.discordapp.com/avatars/${player.userIdDiscord}/${player.avatar}.png" alt="">`
        pokemonsListElement.innerHTML=player.pokemonsID.map((data)=>{
            console.log(data)
            return `<div><p>${data}</p></div>`}).join("")
    })
    .catch((error)=> console.error(error))
}

function getNewPokemon(){
    fetch("/catchnewpokemon")
        .then((res)=>res.json())
        .then((data)=>data.newPokemon)
        .then((newPokemon)=>{
            pokeballElement.innerHTML=
            `<h1>Parabéns!</h1>
            <img class="pokemonImage" src="${newPokemon.sprite}" alt="">
            <p>Você acaba de obter um ${newPokemon.name}</p>
            `
        })
        .catch((error)=>console.error(error))
}

// Init
insertAvatarPokemons()

// Events
pokeballElement.addEventListener("click", getNewPokemon)