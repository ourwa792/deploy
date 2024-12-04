const route = require("express").Router();

const {protectedRoute} = require('../middleware/authMiddleWare')

const {gameNames} = require("../controller/gameName")


route.get('/game/:gameId', protectedRoute, (req, res) => {
    const gameId = req.params.gameId;
    res.render(`game/game_${gameId}`, { pageTitle: `لعبة ${gameId}` ,
      gameNames

    });
});
  
  module.exports = route