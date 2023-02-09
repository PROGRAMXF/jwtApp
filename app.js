const express = require("express");
const jwt = require("jsonwebtoken");

//llamamos a la funcion:
const app = express();

//agregamos una ruta:
app.get("/api", (req, res) => {
  //respondemos con mensaje de json
  res.json({
    mensaje: "Nodejs en JWT",
  });
});
//creamos otra ruta para acceder a nuestra cuenta:
app.post("/api/login", (req, res) => {
  //creamos un objeto usaurio:
  const user = {
    id: 1,
    nombre: "Andres",
    email: "andres@email.com",
  };
  //vamos a generar un token cada vez que el usuario ingrese al login

  jwt.sign(
    { user: user },
    "secretkey",
    { expiresIn: "32s" },
    (error, token) => {
      res.json({
        token: token,
      });
    }
  );
});
//creamos otra ruta para posts donde vamos a utilizar el jwt para poder permitir al usuario que acceda a esta ruta
//siempre y cuando dicho usuario tenga un token
app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (error, authData) => {
    //si ocurre algun error:
    if (error) {
      res.sendStatus(403);
    } else {
      res.json({
        mensaje: "el post fue creado",
        authData: authData,
      });
    }
  });
});

//creamos la funcion verifyToken:

//Authorization: Bearer <token>
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  //verificamos si el token existe:
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

//configuramos el puerto:
app.listen(3000, function () {
  console.log("nodejs app running..");
});
