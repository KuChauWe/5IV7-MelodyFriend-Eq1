

var user = require("../modelo/User");
var UserControler = require("../controlador/UserControler");

const id_nuevoUsuario = "akjdhfkajc"

user.createUserInBD(id_nuevoUsuario,"Kawaii","Requena Rojas Moisés Sófocles", "hombre", new Date("08/09/2003"), 5, "Programación");


UserControler.getUser(id_nuevoUsuario);