const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('./models'); // Ensure your User model is correctly imported
const { JWT_SECRET } = process.env;

// Configure Passport to use Google OAuth
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID, // Ensure your Google Client ID is in .env file
  clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Ensure your Google Client Secret is in .env file
  callbackURL: 'http://localhost:5000/api/auth/google/callback', // Make sure this URL is correct and matches your frontend redirect
}, async (token, tokenSecret, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      // Create a new user if not found
      user = new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
      });
      await user.save();
    }
    done(null, user); // Pass the user to the next step
  } catch (err) {
    done(err);
  }
}));

// Serialize user to store in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user to fetch from DB based on session data
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id); // Fetch the user from the DB
  done(null, user);
});
