const express = require('express');
const jwt = require('jsonwebtoken');

//llamamos a la funcion:
const app = express();

//agregamos una ruta:
app.get('/api', (req, res)=>{
    //respondemos con mensaje de json
    res.json({
        mensaje: "Nodejs en JWT"
    });

});
//creamos otra ruta para acceder a nuestra cuenta:
app.post('/api/login', (req, res)=>{
    //creamos un objeto usaurio:
    const user = {
        id:1,
        nombre:"Andres",
        email:"andres@email.com"
    }    
    //vamos a generar un token cada vez que el usuario ingrese al login

    jwt.sign({user: user}, 'secretkey', (err, token)=>{
        res.json({
            token: token

        });

    });

});
//creamos otra ruta para posts donde vamos a utilizar el jwt para poder permitir al usuario que acceda a esta ruta 
//siempre y cuando dicho usuario tenga un token
app.post('/api/posts', (req, res)=>{
   
    res.json({
        mensaje:"post fue creado"
    });
});
//configuramos el puerto:
app.listen(3000, function(){
    console.log('nodejs app running..');
});
