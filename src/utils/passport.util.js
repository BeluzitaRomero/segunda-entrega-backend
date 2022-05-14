const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const DaoUserMongoDB = require("../daos/users/DaoUserMongoDB");
const userMongo = new DaoUserMongoDB();

//SIGN up
passport.use(
  "local-signup",
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      //VALIDACION A LA BASE DE DATOS
      try {
        const userExists = await userMongo.collection.findOne({ username });
        if (userExists) {
          console.log("El usuario existe");
          return done(null, false);
        }

        const newUser = {
          username,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
        };
        const user = await userMongo.collection.create(newUser);
        return done(null, user);
      } catch (error) {
        console.log(error);
      }
    }
  )
);

passport.use(
  "local-login",
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await userMongo.collection.findOne({ username });
      if (!user) {
        console.log("usuario no encontrado");
        done(null, false);
      }
      const isValid = bcrypt.compareSync(password, user.password);
      if (isValid) {
        console.log("Usuario encontrado");
        return done(null, user);
      } else {
        done(null, false);
      }
    } catch (error) {
      console.log(error);
      done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  userMongo.collection.findById(id, done);
});

module.exports = passport;
