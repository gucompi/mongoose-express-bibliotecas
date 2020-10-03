const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
    //[key]:[Tipo]
    titulo:String,
    autor:String,
    editorial:String,
    precio_pesos:Number,
    precio_dolares:Number,
    categoria:String,
    image_url:String,
    isbn:Number,
    edicion:Number,
    peso:Number,
    numero_paginas:Number,
    publicado:Boolean
});

const LibroModel = mongoose.model('Libro',libroSchema);

module.exports = LibroModel;