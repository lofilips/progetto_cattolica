const DocentiDB = require('../docenti-db');

const mysql = require('mysql')

require('dotenv').config()

console.log(process.env.DBUSER)

const mysqlConnection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE_SQL,
    multipleStatements: true,
    insecureAuth : true
})

module.exports = class MysqlDocentiDB extends DocentiDB {
    
    constructor() {
        super();
        console.log('USO L\'IMPLEMENTAZIONE CON MYSQL');
        mysqlConnection.connect((error) => {
            if (!error) {
                console.log('Connessione a Mysql Server avvenuta con successo')
            } else {
                console.log("Errore di connessione: " + JSON.stringify(error, undefined, 1))
            }
        })
    }

    searchProfBySurname(surname) { 
        return new Promise((resolve, reject) => {
            mysqlConnection.query(
                'SELECT * FROM lista_docenti WHERE CONCAT(nom_docente, " ", cog_docente) LIKE ? OR CONCAT(cog_docente, " ", nom_docente) LIKE ?', ['%' + surname + '%', '%' + surname + '%'],
                (error, rows) => {
                    if (rows === undefined) {
                        reject(new Error("ERROR: rows is undefined"))
                    } else {
                        resolve(rows)
                    }
                })  
        })
    }

    searchProfByStructure(structure) { 
        return new Promise((resolve, reject) => {
            mysqlConnection.query(
                'SELECT * FROM lista_docenti WHERE des_struttura_aff LIKE ?', ['%' + structure + '%'],
                (error, rows) => {
                    if (rows === undefined) {
                        reject(new Error("ERROR: rows is undefined"))
                    } else {
                        resolve(rows)
                    }
                })
        })
    }

    searchProfByCourse(course) { 
        return new Promise((resolve, reject) => {
            mysqlConnection.query(
                'SELECT * FROM lista_docenti WHERE des_facolta LIKE ?', ['%' + course + '%'],
                (error, rows) => {
                    if (rows === undefined) {
                        reject(new Error("ERROR: rows is undefined"))
                    } else {
                        resolve(rows)
                    }
                })
        })
    }

    searchProfByCode(code) {
        return new Promise((resolve, reject) => {
            mysqlConnection.query(
                'SELECT * FROM lista_docenti WHERE cod_docente = ?', [code],
                (error, rows) => {
                    if (rows === undefined) {
                        reject(new Error("ERROR: rows is undefined"))
                    } else {
                        resolve(rows)
                    }
                })
        })      
    }

}