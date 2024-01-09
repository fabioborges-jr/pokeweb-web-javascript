// Import Modules
require("dotenv").config()
const fs = require("fs")
const express=require("express")
const session=require("express-session")
const passport=require("passport")
const {PrismaClient}=require("@prisma/client")
const passportInitialize = require("./src/js/oauth")

// Objects
function Player (email, name, pokemonsID, avatar, userIdDiscord){
  this.email=email
  this.name=name
  this.pokemonsID=pokemonsID
  this.avatar=avatar
  this.userIdDiscord=userIdDiscord
}

function Pokemon(id,name,type,sprite){
  this.id=id
  this.name=name
  this.type=type
  this.sprite=sprite
}

// Instances Modules
const app=express()
const prisma=new PrismaClient()
passportInitialize(passport, prisma)

// Middlewares
app.use(
  session({
    secret: 'dfme$rogv@uerml',
    resave: false, 
    saveUninitialized: false,
    cookie:{maxAge:7*24*60*60*1000}
  }),
  passport.initialize(),
  passport.session(),
  express.static(__dirname + '/'),
  express.static(__dirname + '/src')
)

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.send('not logged in :(');
}

function checkAuthIndex(req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.redirect('/app');
}

// Functions
function gettingPokemonsDB(email){
  return prisma.player.findUnique({
    where:{
      email: email
    }
  })
}

function getPokemonAtPokeAPI(){

}

// Routes
  // Pages
    app.get("/", checkAuthIndex, (req,res)=>{
      const html = fs.readFileSync("./src/html/index.html", "utf-8");
      res.end(html);
    })
    
    app.get('/app', checkAuth, function(req, res) {
      const html = fs.readFileSync("./src/html/app.html", "utf-8");
      res.end(html);
    });
    
    app.get('/catch', checkAuth, function(req, res) {
      const html = fs.readFileSync("./src/html/catch.html", "utf-8");
      res.end(html);
    });

  // Endpoints    
    app.get('/auth/discord/callback',
        passport.authenticate('discord', { failureRedirect: '/' }), function(req, res) { res.redirect('/app') } // auth success
    );

    app.get("/player", function (req, res){
      const player=new Player(
        req.user.email,
        req.user.global_name,
        gettingPokemonsDB(req.user.email),
        req.user.avatar,
        req.user.id    
      )
      res.json({player:player})
    })

    app.get("/catchnewpokemon", function (req, res){
      const drawPokemon=Math.round(Math.random()*150+1)
      let newPokemon
      fetch(`https://pokeapi.co/api/v2/pokemon/${drawPokemon}`)
        .then((res)=>res.json())
        .then(data=>{
          newPokemon=new Pokemon(
            data.id,
            data.name,
            data.types[0].type.name,
            data.sprites.front_default
          )
        })
        .catch((error)=>console.error(error))
        console.log(newPokemon)
        res.json({newPokemon:newPokemon})
      })

// Port Listening
app.listen(3000, function (err) {
  if (err) return console.log(err)
  console.log('Listening at http://localhost:3000/')
})