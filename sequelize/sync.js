//aici ne vom defini entitatile si vom realiza conexiunea cu baza de date
import { Sequelize } from "sequelize";
//import fisier de configurari:
import { sequelizeConfigProps } from "../config.js";
import { sequelizeOperationAPI } from "./operations-api.js";

//definesc conexiune de tip sequelize
const sequelizeConnection = new Sequelize(
    "proiect_instance",
    "root",
    "1995",
    sequelizeConfigProps//are poroprietatile din config.js host localhost etc
);
//creare entitati:min45
//Enities
//facem one to one, one to many 
//entites 1:N
//etitate de tip comanda si produs
export const Jobs = sequelizeConnection.define("Jobs", {//o entitate//se creaza tabela jobs in HS
    JobId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,

    },
    Title: {
        type: Sequelize.STRING
    },
    // NrPositions: {
    //     type: Sequelize.DECIMAL(18, 2),//precizie 18 si  nr decimale 2
    // },
    CompanyP: {
        type: Sequelize.STRING
    },
    SpecificationsJob: {
        type: Sequelize.STRING
    },
    CityJob: {
        type: Sequelize.STRING
    }

});
export const Companies = sequelizeConnection.define("Companies", {//se creaza tabela companies in HS 
    CompanyId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    Name: {
        type: Sequelize.STRING,
    },
    Employee: {
        type: Sequelize.DECIMAL(18, 2),
    }
});
Jobs.hasMany(Companies, {//legatura one to many-min 28  yt 
    foreignKey: "JobId",
    onDelete: "CASCADE",
    foreignKeyConstraint: true,
});
////////////////////////////////////////////////////////////////////////////////////////////////////
// ----------1:1  ---------- //
export var Candidates = sequelizeConnection.define("Candidates", {//se creaza tabela companies in HS 
    CandidateId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    Name: {
        type: Sequelize.STRING
    },
    Age: {
        type: Sequelize.INTEGER(100),
    },
    Position: {//pozitia curenta job ul curent
        type: Sequelize.STRING
    },
    Seniority: {//vechime in munca nr
        type: Sequelize.INTEGER(100),
    }
});
export const Profiles = sequelizeConnection.define("Profiles", {
    ProfilesId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    Name: {
        type: Sequelize.STRING,
    },
    Cv: {
        type: Sequelize.STRING,
    },
});
Candidates.hasOne(Profiles, { foreignKey: "CandidateId" });
Profiles.belongsTo(Candidates, { foreignKey: "CandidateId" });
// ---------- 1:1 -------sfarsit--- //
// Candidates.hasMany(Profiles, {//legatura one to many-min 28  DE MINE PT LEGATURA TUTUROR
//     foreignKey: "CandidatId",
//     onDelete: "CASCADE",
//     foreignKeyConstraint: true,
// });



sequelizeOperationAPI.init(sequelizeConnection);//ne autentificam , face in operation-api.js functii init
export { sequelizeConnection };//export squelize connection


