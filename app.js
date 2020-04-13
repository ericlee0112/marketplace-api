const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fs = require('fs');
const https = require('https');
const openssl = require('openssl-nodejs');

dotenv.config();

const key = fs.readFileSync('./localhost-key.pem');
const cert = fs.readFileSync('./localhost.pem');

const { 
  auth, 
  requiresAuth
} = require('express-openid-connect');

const app = express();

const config = {
  required: false,
  auth0Logout: true,
  baseURL: "https://localhost:3000",
  issuerBaseURL: "https://dev-4ugefhqm.auth0.com",
  clientID: "dyc6Sm72FdUtuVaubBKuvNrBwor8BNzQ",
  appSessionSecret: "a long, randomly-generated string stored in env"
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(auth(config));

https.createServer({key, cert}, app).listen('3000', () => {
  console.log('Listening on https://localhost:3000');
});

app.get('/', function(req, res) {
  res.send(req.isAuthenticated() ?
    "Logged in" :
    "Logged out"
  );
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.openid.user));
})