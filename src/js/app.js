const avatarElement=document.getElementById("avatar")

function Player (email, name, pokemonsID, avatar, userIdDiscord){
    this.email=email
    this.name=name
    this.pokemonsID=pokemonsID
    this.avatar=avatar
    this.userIdDiscord=userIdDiscord
}

fetch("/player")
.then((res)=>res.json())
.then((data)=>{
    const player=new Player(
        data.user.email,
        data.user.name,
        data.user.
        )
    console.log(data.user)
    return avatarElement.innerHTML=`<img class="avatarImage" src="https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}.png" alt="">`
})

