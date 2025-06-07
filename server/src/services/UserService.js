const User = require("../models/UserModel")

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: "OK",
                    message: "The email is already"
                })
            }

            const createdUser = await User.create({
                name,
                email,
                password,
                confirmPassword,
                phone,

            })
            if (createdUser) {
                resolve({
                    status: "OK",
                    message: "Success",
                    data: createdUser
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createUser
}