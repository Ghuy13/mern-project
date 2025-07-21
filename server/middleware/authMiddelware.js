const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config()
// -----------------------------------
// const authMiddelWare = (req, res, next) => {
//     const token = req.headers.token.split(' ')[1];
//     jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
//         if (err) {
//             return res.status(404).json({
//                 message: 'The authemtication',
//                 status: 'ERROR'
//             })
//         }
//         const { payload } = user
//         if (payload?.isAdmin) {
//             next()
//         } else {
//             return res.status(404).json({
//                 message: 'The authemtication',
//                 status: 'ERROR'
//             })
//         }
//     });
// }

// const authUserMiddleware = (req, res, next) => {
//     const token = req.headers.token.split(' ')[1] // Lấy token từ req.headers.token và tách ra
//     const userId = req.params.id

//     jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
//         if (err) {
//             return res.status(404).json({
//                 message: 'The authemtication',
//                 status: 'ERROR'
//             })
//         }

//         console.log('user', user)

//         if (user?.isAdmin || user?.id === userId) {
//             next()
//         } else {
//             return res.status(404).json({
//                 message: 'The authemtication',
//                 status: 'ERROR'
//             })
//         }
//     })
// };
// -----------------------------------

const authMiddelWare = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken || typeof bearerToken !== 'string' || !bearerToken.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'No or invalid token provided',
            status: 'ERROR'
        });
    }
    const token = bearerToken.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(401).json({
                message: 'The authentication',
                status: 'ERROR'
            });
        }
        if (user?.isAdmin) {
            next();
        } else {
            return res.status(403).json({
                message: 'The authentication',
                status: 'ERROR'
            });
        }
    });
};

const authUserMiddleware = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken || typeof bearerToken !== 'string' || !bearerToken.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'No or invalid token provided',
            status: 'ERROR'
        });
    }
    const token = bearerToken.split(' ')[1];
    const userId = req.params.id;

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(401).json({
                message: 'The authentication',
                status: 'ERROR'
            });
        }

        if (user?.isAdmin || user?.id === userId) {
            next();
        } else {
            return res.status(403).json({
                message: 'The authentication',
                status: 'ERROR'
            });
        }
    });
};



module.exports = {
    authMiddelWare,
    authUserMiddleware
}
