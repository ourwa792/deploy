const route = require("express").Router();

const {protectedRoute} = require('../middleware/authMiddleWare')

const {gameNames} = require("../controller/gameName")

route.get('/board',protectedRoute , (req, res) => {
    res.render('board', {pageTitle: "لوح الرسم" , gameNames})
})

module.exports = route