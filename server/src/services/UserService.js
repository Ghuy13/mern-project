const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService")

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: "ERR",
                    message: "The email is already"
                })
            }
            const hash = bcrypt.hashSync(password, 10);
            const createdUser = await User.create({
                name,
                email,
                password: hash,
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

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser === null) {
                resolve({
                    status: "ERR",
                    message: "The user is not defined"
                })
            }

            const comparePassword = bcrypt.compareSync(password, checkUser.password)

            if (!comparePassword) {
                resolve({
                    status: "OK",
                    message: "The password or user is incorrect"
                })
            }
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            resolve({
                status: "OK",
                message: "Success",
                access_token,
                refresh_token
            })
        } catch (error) {
            reject(error)
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })

            if (checkUser === null) {
                resolve({
                    status: "OK",
                    message: "The user is not defined"
                })
            }

            const updateUser = await User.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: "OK",
                message: "Success",
                data: updateUser
            })
        } catch (error) {
            reject(error)
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: "OK",
                    message: "The user is not defined"
                })
            }
            await User.findByIdAndDelete(id)
            resolve({
                status: "OK",
                message: "Delete user success",
            })
        } catch (error) {
            reject(error)
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                status: "OK",
                message: "Success",
                data: allUser
            })
        } catch (error) {
            reject(error)
        }
    })
}

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
            if (user === null) {
                resolve({
                    status: "OK",
                    message: "The user is not defined"
                })
            }
            resolve({
                status: "OK",
                message: "Success",
                data: user
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser
}