//fisier pt configurari
export var databaseConfigProps = {
    port: 3306,
    host: "localhost",
    user: "root",
    password: "1995",
    database: "proiect_instance"
}
//o cinfigurare semnar 2
export const sequelizeConfigProps = {
    host: "localhost",
    dialect: "mariadb",
    dialectOptions: {
        options: {
            trustedConnections: true, //marcheaza conexiunea ca fiind sigura
        },
    },
}//apoi instalex sequlelize in terminal npm install sequelize