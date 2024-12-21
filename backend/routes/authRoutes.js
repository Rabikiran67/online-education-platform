const express = require("express");
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const User = require("../models/User"); // Replace with your User model

const router = express.Router();

// Configure Passport with Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find or create a user in your database
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
          });
          await user.save();
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Middleware to handle sessions
const cookieSession = require("cookie-session");
router.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    keys: [process.env.COOKIE_KEY],
  })
);
router.use(passport.initialize());
router.use(passport.session());

// Routes for Google Authentication
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login", // Redirect to login page on failure
  }),
  (req, res) => {
    res.redirect("/"); // Redirect to the homepage on success
  }
);

// Logout Route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

// Test Authentication Route
router.get("/current_user", (req, res) => {
  res.send(req.user);
});

module.exports = router;
