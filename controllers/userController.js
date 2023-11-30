const User = require('../models/User');
const passport = require('../utils/passport');

// Controller for user registration (signup)
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    // Check if the password is at least 8 characters long
    if (password.length < 8) {
      return res.redirect('/signup?message=Password must be at least 8 characters long');
    }

    const user = new User({ firstName, lastName, email, password, phoneNumber });

    // Check if the email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.redirect('/signup?message=Email already exists');
    }

    await user.save();

    return res.redirect(`/login`);
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Controller for user login
exports.login = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login?message=Incorrect email or password',
    failureFlash: true,
  })(req, res, next);
};


// controller for user logout
exports.logout = (req, res) => {
  try {
    // Passport.js logout
    req.logout(() => console.log('Logging out ...'));

    // Set a flash message
    req.flash('success', 'You have been successfully logged out.');

    // Redirect to the home page or login page
    res.redirect('/login');
  } catch (error) {
    console.error('Error during user logout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

