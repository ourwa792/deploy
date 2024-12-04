// المسار: /src/middleware/isAdmin.js
const {gameNames} = require("../controller/gameName")

const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(403).render('error',{gameNames,
            pageTitle: 'لست في الجلسة' ,
            err: 'لست في الجلسة'
        })
    }

    if (!req.user.isAdmin) {
        
        //return res.status(403).send('Access denied. Admins only.');
        return res.status(403).render('error',{gameNames,
            pageTitle: 'لست أدمن' ,
            err: 'لست الادمن'
        })
    }

    next();
};

module.exports = isAdmin;
