const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, reqired: true},
    price: { type: Number, required: true}
});

module.exports = mongoose.model('Product', productSchema);