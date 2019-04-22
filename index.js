'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, (err, res) =>{
    if (err) {
        return console.log(`Erro ao conectar BD: ${err}`)
    }     
    console.log('Conexão DB estabelecida...')
    
    app.listen(config.port, () => {
        console.log(`API REST http://localhost:${config.port}` )
    })
})

