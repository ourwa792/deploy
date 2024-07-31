const route = require("express").Router();

const {protectedRoute} = require('../middleware/authMiddleWare')

route.get('/board',protectedRoute , (req, res) => {
    res.render('board', {pageTitle: "لوح الرسم"})
})

module.exports = route