var Product = require('./models/productSchema');
var Comment = require('./models/commentSchema');
var Product = require('./models/productSchema');
var User = require('./models/userSchema');

var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
var FacebookStrategy = require('passport-facebook-token')
var GoogleStrategy = require('passport-google-token').Strategy;


//$$$$$$$$$$$$$$$$$$$$$$$ Based local auth Strategy $$$$$$$$$$$$$$$$$$$$$$$
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// $$$$$$$$$$$$$$$$$$$$$$$ JWT based strategy $$$$$$$$$$$$$$$$$$$$$$$
// Creating the Token
exports.getToken = (user) =>{
    return(
        jwt.sign(user, process.env.secretKey, {expiresIn: 604800})
    )
};

var options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.secretKey
};

passport.use(new JwtStrategy(options, (jwt_payload, done) =>{

    User.findOne({_id: jwt_payload._id}, (err, user) =>{
        if(err){
            done(err, false);
        }else
        if(user){
            done(null, user);
        }else{
            done(null, false);
        }
    })
}));


// *****************************************Start Handling login with Facebook OAuth2*****************************************
exports.facebookPassport = passport.use(new FacebookStrategy(
    {
        clientID: process.env.FB_APP_ID,
        clientSecret: process.env.FB_APP_SECRET,
        profileFields: ['id', 'picture', 'email', 'first_name', 'last_name']
        //  profileFields: ['id', 'displayName', 'picture.type(large)', 'email', 'birthday', 'friends', 'first_name', 'last_name', 'middle_name', 'gender', 'link']
    },
    (accessToken, refreshToken, profile, done) =>{
        User.findOne({facebookId: profile.id}, (err, user) =>{
            if (err){
                return done(err, false);
            }
            if (!err && user !== null){
                return done(null, user);
            }else{
                console.log(profile._json);
                user = new User({username: `${profile._json.first_name}-${profile._json.id}`});
                user.facebookId = profile._json.id;
                user.firstname = profile._json.first_name;
                user.lastname = profile._json.last_name;
                user.email = profile._json.email;
                user.avatar = profile._json.picture.data.url;
                user.isVerified = true;
                user.save((err, userCreated) =>{
                    if (err){
                        return done(err, false);
                    }else{
                        return done(null, userCreated);
                    }
                })
            }
        })
    }
))
// *****************************************End Handling login with OAuth2 Facebook*****************************************


// *****************************************Start Handling login with Google OAuth2*****************************************
exports.googlePassport = passport.use(new GoogleStrategy(    
    {
        clientID: process.env.GOOGLE_APP_ID,
        clientSecret: process.env.GOOGLE_APP_SECRET,
    },
    (accessToken, refreshToken, profile, done) =>{
        User.findOne({googleId: profile.id}, (err, user) =>{
            if (err){
                return done(err, false);
            }
            if (!err && user !== null){
                return done(null, user);
            }else{
                console.log(profile);
                user = new User({username: `${profile._json.given_name}-${profile._json.id}`});
                user.googleId = profile._json.id;
                user.firstname = profile._json.given_name;
                user.lastname = profile._json.family_name;
                user.email = profile._json.email;
                user.avatar = profile._json.picture;
                user.isVerified = true;
                user.save((err, userCreated) =>{
                    if (err){
                        return done(err, false);
                    }else{
                        return done(null, userCreated);
                    }
                })
            }
        })
    }
))
// *****************************************End Handling login with Google OAuth2*****************************************



// *****************************************Start verify user *****************************************
exports.verifyUser = passport.authenticate('jwt', {session: false});
// *****************************************End verify user *****************************************

// *****************************************Start verify owner *****************************************
exports.verifyOwner = (req, err, next) =>{
    const collection = req.params.commentId ? Comment : Product;
    const uri = req.params.commentId ? req.params.commentId : req.params.productId;
    
    collection.findById(uri)
    .then((result) =>{
        if(result){
            var author = result.user;
            var user = req.user._id;

            if(user.equals(author)){
                next();
            }else{
                err = new Error("You're not the owner, you're not allowed to perform this operation.");
                err.status = 403;
                next(err);
            }   
        }else{
            err = new Error("Not found");
            err.status = 403;
            next(err);
        }
    }, err => next(err))
    .catch((err) => next(err));
};
// *****************************************End verify owner *****************************************