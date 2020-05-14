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
require('./routes/findUser')(app);
