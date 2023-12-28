// Import Modules
require("dotenv").config()
const fs = require("fs")
const express=require("express")
const session=require("express-session")
const passport=require("passport")
const {PrismaClient}=require("@prisma/client")
const passportInitialize = require("./src/js/oauth")

// Intances Modules
const app=express()
const prisma=new PrismaClient()
passportInitialize(passport, prisma)

// Midlewares
app.use(
  session({secret: 'keyboard cat',resave: false, saveUninitialized: false}),
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

// Routes
app.get("/", checkAuthIndex, (req,res)=>{
  const html = fs.readFileSync("./src/html/index.html", "utf-8");
  res.end(html);
})

app.get('/auth/discord/callback',
    passport.authenticate('discord', { failureRedirect: '/' }), function(req, res) { res.redirect('/app') } // auth success
);

app.get('/app', checkAuth, function(req, res) {
  const html = fs.readFileSync("./src/html/app.html", "utf-8");
  res.end(html);
});

// Port Listening
app.listen(3000, function (err) {
  if (err) return console.log(err)
  console.log('Listening at http://localhost:3000/')
})