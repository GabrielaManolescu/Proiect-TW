//fisier initializare server///////MIN 15 seminar 7 

//17.11.2021- Server REST sau API REST am facut metodele pe care le -am apelat folosind Postman sau Browser Disrect
//24.11.2021---Comunicarea cu baza de date folosindune de un ORM ;;Sequelize

import express from "express";
import cors from "cors";
import dotenv from "dotenv";//acces la .env

if (process.env.NODE_ENV != 'production') dotenv.config();//acces la .env

const server = express();//pt a reface un server
//definire router:
const router = express.Router();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());//pt requesturiintre 2 servere diferite

//definire router ruta standard:
server.use("/api", router);//serverul are numele api ..o pot numi cum vreau

//definire PORT:
var port = process.env.PORT || 8000;
server.listen(port, function afterServerStart() {
    console.log(`Serverul rulează pe portul ${port}...`)

});

//export server si router. api.js le importam
export { server, router };
