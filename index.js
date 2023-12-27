// Import Modules
require("dotenv").config()
const fs = require("fs")
const express=require("express")
const session=require("express-session")
const passport=require("passport")
const Strategy=require("./node_modules/passport-discord/lib/strategy")
const {PrismaClient}=require("@prisma/client")

// Intances Modules
const app=express()
const prisma=new PrismaClient()

// Passport Configuration
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var scopes = ['identify'];
passport.use(new Strategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.REDIRECT_URI,
  scope: scopes,
}, async function(accessToken, refreshToken, profile, done) {
  console.log(profile)
  await prisma.player.create({data:{
    name:profile.global_name
  }})
  process.nextTick(function() {
      return done(null, profile);
  });
}));

app.use(
  session({secret: 'keyboard cat',resave: false, saveUninitialized: false}),
  passport.initialize(),
  passport.session(),
  express.static(__dirname + '/'),
  express.static(__dirname + '/src')
)

// Routes
app.get("/", checkAuthIndex, (req,res)=>{
  const html = fs.readFileSync("./src/html/index.html", "utf-8");
  res.end(html);
})

app.get('/auth/discord/callback',
    passport.authenticate('discord', { failureRedirect: '/' }), function(req, res) { res.redirect('/app') } // auth success
);

app.get('/app', checkAuth, function(req, res) {
  console.log(__dirname)
  const html = fs.readFileSync("./src/html/app.html", "utf-8");
  res.end(html);
});

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.send('not logged in :(');
}

function checkAuthIndex(req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.redirect('/app');
}

// Port Listening
app.listen(3000, function (err) {
  if (err) return console.log(err)
  console.log('Listening at http://localhost:3000/')
})