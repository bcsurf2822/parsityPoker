const express = require('express');

const registerRoute = require('./register');
const loginRoute = require('./login');
const logoutRoute = require('./logout');
const fundingRoute = require('./funding');
const userInfoRoute = require('./userInfo');
const createGamesRoute = require('./createGames');
const userNameRoute = require('./userNames');

function setupRoutes(app) {
  app.use(registerRoute);
  app.use(loginRoute);
  app.use(logoutRoute);
  app.use(fundingRoute);
  app.use(userInfoRoute);
  app.use(createGamesRoute);
  app.use(userNameRoute);
}

module.exports = setupRoutes;
