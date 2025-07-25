const Product = require("../models/ProductModel")

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description } = newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    status: "OK",
                    message: "The name of product is already"
                })
            }
            const newProduct = await Product.create({
                name, image, type, price, countInStock, rating, description

            })
            if (newProduct) {
                resolve({
                    status: "OK",
                    message: "Success",
                    data: newProduct
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })

            if (checkProduct === null) {
                resolve({
                    status: "OK",
                    message: "The product is not defined"
                })
            }
            const updatedroduct = await Product.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: "OK",
                message: "Success",
                data: updatedroduct
            })
        } catch (error) {
            reject(error)
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: "OK",
                    message: "The Product is not defined"
                })
            }
            await Product.findByIdAndDelete(id)
            resolve({
                status: "OK",
                message: "Delete product success",
            })
        } catch (error) {
            reject(error)
        }
    })
}


const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
            if (product === null) {
                resolve({
                    status: "OK",
                    message: "The product is not defined"
                })
            }
            resolve({
                status: "OK",
                message: "Success",
                data: product
            })
        } catch (error) {
            reject(error)
        }
    })
}


const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments();
            // console.log("filter", filter)
            if (filter) {
                const label = filter[0];
                console.log('label', label);
                const allObjectFilter = await Product.find({
                    [label]: { '$regex': filter[1], '$options': 'i' }
                }).limit(limit).skip(page * limit)
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                });
            }
            if (sort) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0] === 'asc' ? 1 : -1;
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort);
                resolve({
                    status: "OK",
                    message: "Success",
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                });
            } else {
                const allProduct = await Product.find().limit(limit).skip(page * limit);
                resolve({
                    status: "OK",
                    message: "Success",
                    data: allProduct,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct
}