const express = require('express');
const router = express.Router();
const path = require('path');
const fetch = require('node-fetch');
const UserController = require('../controllers/userController');
const movieController = require('../controllers/movieController');
const isAuthenticated =  require('../utils/authChecker')

router.get('/signup(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'signup.html'));
});

//route for login
router.get('/login(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'login.html'));
});

router.get('/landing(.html)?', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'html', 'landing.html'));
});

router.get('/home(.html)?', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'html', 'home.html'));
});

router.get('/dashboard(.html)?',isAuthenticated, (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'html', 'dashboard.html'));
});

router.get('/About(.html)?', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'html', 'About.html'));
});

router.get('/Blog(.html)?', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'html', 'Blog.html'));
});

router.get('/contact(.html)?', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'html', 'contact.html'));
});

router.get('/search(.html)?', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'html', 'search.html'));
});

router.get('/stream(.html)?', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'html', 'player.html'));
});

router.get('/trailer(.html)?', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'html', 'trailer.html'));
});

router.get('/megwatch(.html)?', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'html', 'megawatch.html'));
});

router.get('/test(.html)?', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'html', 'testsearch.html'));
});

router.post('/auth/signup', UserController.signup);

router.post('/auth/login', UserController.login);

router.get('/auth/logout', UserController.logout);

router.get('/movie/search/:movie', movieController.movieSearch);

module.exports = router;
