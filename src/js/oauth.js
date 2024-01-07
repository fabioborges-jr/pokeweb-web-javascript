const Strategy=require("../../node_modules/passport-discord/lib/strategy")

// Passport Configuration
function passportInitialize(passport, prisma){
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

        if (profile){
        discordCredentials=profile
        const getPlayer=await prisma.player.findUnique({where:{
            email:profile.email
        }})

        if(!getPlayer){
            await prisma.player.create({data:{
            email:profile.email,
            name:profile.global_name,
            pokemonsID:[]
            }})
        }
        
        process.nextTick(function() {
            return done(null, profile);
        });
        }
    }));
}

module.exports=passportInitialize