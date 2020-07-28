const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connect('mongodb+srv://Marko:PQGKmsp7J5qOpF4L@cluster0.25cnz.mongodb.net/places_test?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to database!')
    }).catch(() => {
        console.log('Connection failed!');
    });

const createProduct = async (req, res, next) => {
    const createdProduct = new Product({
        name: req.body.name,
        price: req.body.price
    });
    //console.log(createdProduct);
    const result = await createdProduct.save();

    console.log(typeof createdProduct._id);

    res.json(result);
};

const getProducts = async (req, res, next) => {
    const products = await Product.find().exec();
    res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;