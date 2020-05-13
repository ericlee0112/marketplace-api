const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const cors = require('cors');

const { getListings, initialize, registerUser } = require('./queries');
dotenv.config();
/*
initialize(
  passport,
);
*/
const app = express();

app.set('view-engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

require('./config/passport');

app.use(cors());

app.listen(process.env.PORT, () => {
  console.log("server started at port: " + process.env.PORT);
});

require('./routes/loginUser')(app);
require('./routes/registerUser')(app);


app.get('/', checkAuthenticated, (req, res) => {
  res.render('listings.ejs', { name: req.user.first_name } )
});

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
});

app.post('/register', checkNotAuthenticated, registerUser);
/*
app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    registerUser(req, res);
    res.redirect('/login');
  } catch (err) {
    console.log(err)
    res.redirect('/register');
  }
});
*/
app.delete('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});


/* authentication helpers */

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next();
}