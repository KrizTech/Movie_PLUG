// Middleware to check if the user is authenticated
const passport = require('passport');

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();  // User is authenticated, continue with the request
  } else {
    res.redirect('/login');  // User is not authenticated, redirect to login page
  }
};

module.exports = isAuthenticated;
