const avatarElement=document.getElementById("avatar")

fetch("/player")
.then((res)=>res.json())
.then((data)=>{
    const player=data.player
    return avatarElement.innerHTML=`<img class="avatarImage" src="https://cdn.discordapp.com/avatars/${player.userIdDiscord}/${player.avatar}.png" alt="">`
})

