//importing modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const connectDB = require('./utils/db');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

const PORT = process.env.PORT || 5000;

connectDB();
const app = express();

// express-session middleware
app.use(session({
  secret: 'MoviePlug',
  resave: false,
  saveUninitialized: false,
}));

//middleware
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', require('./routes/index'));
app.use(bodyParser.json());
app.use(cors());


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
  next();
});

//handle pages not found
app.all('*', (req, res) => {
	res.status(404);
	if (req.accepts('html')) {
		res.sendFile(path.join(__dirname, 'public', 'html', '404.html'));
	}else if (req.accepts('json')){
		res.json({"error" : "404 Not found ..."});
	} else res.type('txt').send("404 Not Found ....");
});

//start server after checkeing connection
mongoose.connection.once('open', () => {
	console.log('Database connected ....');
	app.listen(PORT, () => console.log(`server started on port ${PORT}`));
});
