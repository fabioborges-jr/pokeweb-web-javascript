// Variables
const avatarElement=document.getElementById("avatar")
const pokeballElement=document.getElementById("buttonGetPokemon")
const pokemonsListElement=document.getElementById("pokemonsListElement")


// Functions
async function getPlayerData(){
    return fetch("/player", {timeout:10000})
    .then((res)=>res.json())
    .then((data)=>{
        const player=data.player
        const pokemonsDetails=data.pokemonsDetails
        return {player, pokemonsDetails}
    })
    .catch((error)=>console.error(error))
}

function insertAvatarPokemons(){
    getPlayerData()
    .then(({player, pokemonsDetails})=>{
        avatarElement.innerHTML=`<img class="avatarImage" src="https://cdn.discordapp.com/avatars/${player.userIdDiscord}/${player.avatar}.png" alt="">`
        pokemonsListElement.innerHTML=pokemonsDetails.map((data)=>{
           return `
           <div>
           <p>${data.name}</p>
           <img src="${data.sprite}" alt="">
           </div>`}).join("")
    })
    .catch((error)=> console.error(error))
}

function getNewPokemon(){
    fetch("/catchnewpokemon", {timeout:10000})
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