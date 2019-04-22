'use strict'

const Product = require('../models/product')


function getProduct (req, res){
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({message: `Não foi possivel realizar a busca: ${err}`})
        if (!product) return res.status(404).send({message: `Produto não existe`})

        res.status(200).send({product})
    })
    
}

function getProducts (req, res){
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({message: `Não foi possivel realizar a busca: ${err}`})
        if (!products) return res.status(404).send({message: `Produtos não existem`})

        res.send(200, {products})
 })

}

function saveProduct(req, res){
    console.log('POST /api/product')
    console.log(req.body)

    let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    product.save((err, productStored ) => {
        if (err) res.status(500).send({message: `Erro ao salvar no BD: ${err}`})
        
        res.status(200).send({product: productStored})
    })
}

function updateProduct (req, res){
    let productId = req.params.productId
    let update = req.body

    Product.findByIdAndUpdate(productId, update, (err, productUpdated) =>{
       if (err) res.status(500).send({message: `Erro ao atualizar produto: ${err}`})

       res.status(200).send({ product: productUpdated})
    })

}

function deleteProduct (req, res){
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if (err) res.status(500).send({message: `Erro ao excluir produto: ${err}`})


        product.remove(err => {
            if (err) res.status(500).send({message: `Erro ao excluir produto: ${err}`})
            res.status(200).send({message: `O produto foi excluido`})
        })
    })
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}

