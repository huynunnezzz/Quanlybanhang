const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    thumbnail: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    price: {
        type: Number,
        default: 0
    },
    cat_id: {
        type: mongoose.Types.ObjectId,
        ref:"Category",
        require: true
    },
    status: {
        type: String,
        default: null
    },
    featured: {
        type: Boolean,
        default: false
    },
    promotion: {
        type: String,
        default: null
    },
    warranty: {
        type: String,
        default: null
    },
    accessories: {
        type: String,
        default: null
    },
    is_stock: {
        type: Boolean,
        default: true
    },
    name: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        require: true
    },

});

module.exports = mongoose.model('Product', productSchema, 'products');