

import UserControler from "../controlador/UserControler.mjs";
import User from "../modelo/User.mjs";

const id_nuevoUsuario = "akjdhfkajc"

var UC = new UserControler;
var U = new User;

UC.createConnection();

U.createUserInBD("aozxcvklasdf", "kawaii", "Requena Rojas Moisés Sofocles", "Masculino" , new Date("08/09/2003"), 5, "Técnico")



UC.closeConnection();