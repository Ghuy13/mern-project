const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { use } = require("react");
dotenv.config()

const genneralAccessToken = (payload) => {
    const access_token = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '1h' })
    return access_token
}

const genneralRefreshToken = (payload) => {
    const refresh_token = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })
    return refresh_token
}


const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    console.log('err', err);
                    return resolve({
                        status: 'ERR',
                        message: 'The authentication'
                    });
                }
                const access_token = await generalAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin
                });

                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    access_token
                });
            });
        } catch (e) {
            reject(e);
        }
    });
};


module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService
}