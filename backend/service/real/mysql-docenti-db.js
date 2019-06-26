const DocentiDB = require('../docenti-db');

const express = require('express')
const mysql = require('mysql')
const bodyparser = require('body-parser')
const cors = require('cors')

require('dotenv/config')

const app = express()

app.use(bodyparser.json())
app.use(cors())

const mysqlConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_SQL,
    multipleStatements: true
})

module.exports = class MysqlDocentiDB extends DocentiDB {
    
    constructor() {
        super();
        console.log('USO L\'IMPLEMENTAZIONE CON MYSQL');
    }

    componentDidMount() {
        
        mysqlConnection.connect((error) => {
            if (!error) {
                console.log('Success! Siamo connessi a mysql')
            } else {
                console.log("Failed! Error: " + JSON.stringify(error, undefined, 2))
            }
        })
        
        app.listen(4001, () => console.log('Mysql server sta ascoltando sulla porta 4001'))
        
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