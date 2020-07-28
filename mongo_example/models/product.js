const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type, String, reqired: true},
    price: { type: Number, required: true}
});

modul.exports = mongoose.model('Product', productSchema);