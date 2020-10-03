const CONNECTION_STRING = 'mongodb+srv://<user>:<psw>@cluster0.ucpao.mongodb.net/biblioteca_v2?retryWrites=true&w=majority'
const PORT = '4200';
const mongoose = require('mongoose');
const Libro = require('./models/Libro');

const express = require('express');
const app = express();

//BodyParser
app.use(express.json());


app.get('/',function(req,res){
    res.status(200).send({message:"Server Express Up & Running"});
})


//GetLibroByID
app.get('/libro/:id',function(req,res){
    let ID = req.params.id;
    
    Libro.findById(ID).then(function(libroFinded){
        
        if(!libroFinded) return res.status(404).send({error:"Libro Not Found"});
        if( !libroFinded.publicado) return res.status(404).send({error:"Libro No Publicado"});
        
        res.status(200).send({libro:libroFinded});
    }).catch(function(err){
        res.status(500).send({error:err});
    })
})

//CreateLibro
app.post('/libro',function(req,res){
    let libro = new Libro({
        titulo: req.body.titulo,
        autor: req.body.autor,
        editorial: req.body.editorial,
        precio_pesos: req.body.precio_pesos,
        precio_dolares: req.body.precio_dolares,
        categoria: req.body.categoria,
        image_url: req.body.image_url,
        isbn: req.body.isbn,
        edicion: req.body.edicion,
        peso: req.body.peso,
        numero_paginas: req.body.numero_paginas,
        publicado: true
    });

    libro.save().then(function(libroSaved){
        res.status(201).send({libro:libroSaved});
    }).catch(function(err){
        res.status(500).send({error:err});
    })
})

//DeleteLibroById
app.delete('/libro/:id',function(req,res){
    const ID = req.params.id;
    /* Forma de eliminar, POSTA */
    /*
    Libro.findByIdAndDelete(ID).then(function(libroDeleted){
        if(!libroDeleted) return res.status(404).send({error:"Libro Not Found"})
        res.status(200).send({libro:libroDeleted});
    }).catch(function(err){
        res.status(500).send({error:err});
    })
    */
    /*Forma de eliminar, "Soft" delete */
    Libro.findByIdAndUpdate(ID,{publicado:false},{new:true}).then(function(libroUpdated){
        if(!libroUpdated) return res.status(404).send({error:"Libro Not Found"});
        res.status(200).send({libro:libroUpdated});
    }).catch(function(err){
        res.status(500).send({error:err})
    })
})




mongoose.connect(CONNECTION_STRING,function(err){
    if(err){
        console.error(err.message)
    }else{
        console.log("Conexion establecida");


        app.listen(PORT,function(){
            console.log("Server Express Listening");
        });
        /*

        let libro = new Libro({
            titulo:"Harry Potter Y La Camara Secreta",
            autor:"Rowling J. K.",
            editorial:"Salamandra",
            precio_pesos:999.000,
            precio_dolares:12.49,
            categoria:"Fantasía",
            image_url:"https://contentv2.tap-commerce.com/cover/large/9789878000114_1.jpg?id_com=1113",
            isbn:9789878000114,
            edicion:2020,
            peso:240,
            numero_paginas:320,
            publicado:true
        })


        console.log("El libro creado por el modelo es: ", libro);



        libro.save().then(function(libroSaved){
            console.log("El libro guardado en la base de datos es: ", libroSaved);
        })
        */
    }
})



/**

C - Create  - POST * 
R - Read    - GET * 
U - Update  - PATCH
D - Delete  - DELETE



 */


