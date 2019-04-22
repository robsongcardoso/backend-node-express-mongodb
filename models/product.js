'use strict'

const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
    name: String,
    picture: String,
    price: {type: Number, default: 0},
    //Para aceitar somente as categorias especificadas aqui
    category: {type: String, enum:['computers', 'phones', 'accessories']},
    description: String
})
module.exports = mongoose.model('Product', ProductSchema)