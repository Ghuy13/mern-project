const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config()

const authMiddelWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authemticationnn',
                status: 'ERROR'
            })
        }
        const { payload } = user
        if (payload?.isAdmin) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERROR'
            })
        }
    });
}

module.exports = {
    authMiddelWare
}

