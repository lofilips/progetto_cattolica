const DocentiDB = require('../docenti-db')
require('dotenv').config()

// console.log(process.env.DBUSER)

const knex = require('knex')({
    client: 'mysql',
    version: '8.0.16',
    connection: {
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: process.env.DATABASE_SQL
    },
    pool: { min: 0, max: 1000 }
})

module.exports = class MysqlDocentiDB extends DocentiDB {
    
    constructor() {
        super()
        console.log('USO L\'IMPLEMENTAZIONE CON MYSQL')
    }

    searchProfBySurname(surname) { 
        return new Promise((resolve, reject) => {
            knex.select('*').from('lista_docenti').where(knex.raw("CONCAT(cog_docente, ' ', nom_docente)"), 'like', '%' + surname + '%').orWhere(knex.raw("CONCAT(nom_docente, ' ', cog_docente)"), 'like', '%' + surname + '%')
            .on('query-error', error => console.log("QUERY ERROR: " + error))
            .then(rows => {
                if (rows === undefined) {
                    reject(new Error("Rows is undefined"))
                } else {
                    resolve(rows)
                }
            })
            .catch(error => console.log('ERRORE: ' + error))
        })
    }

    searchProfByStructure(structure) { 
        return new Promise((resolve, reject) => {
            knex.select('*').from('lista_docenti').where('des_struttura_aff', 'like', '%' + structure + '%')
            .on('query-error', error => console.log("QUERY ERROR: " + error))
            .then(rows => {
                if (rows === undefined) {
                    reject(new Error("Rows is undefined"))
                } else {
                    resolve(rows)
                }
            })
            .catch(error => console.log('ERRORE: ' + error))
        })
    }

    searchProfByCourse(course) { 
        return new Promise((resolve, reject) => {
            knex.select('*').from('lista_docenti').where('des_facolta', 'like', '%' + course + '%')
            .on('query-error', error => console.log("QUERY ERROR: " + error))
            .then(rows => {
                if (rows === undefined) {
                    reject(new Error("Rows is undefined"))
                } else {
                    resolve(rows)
                }
            })
            .catch(error => console.log('ERRORE: ' + error))
        })
    }

    searchProfByCode(code) { 
        return new Promise((resolve, reject) => {
            knex.select('*').from('lista_docenti').where('cod_docente', code)
            .on('query-error', error => console.log("QUERY ERROR: " + error))
            .then(rows => {
                if (rows === undefined) {
                    reject(new Error("Rows is undefined"))
                } else {
                    resolve(rows)
                }
            })
            .catch(error => console.log('ERRORE: ' + error))
        })
    }

    searchProfByTeaching(teach) { 
        return new Promise((resolve, reject) => {
            knex.select('*').from('conferimenti_docenti').where('DES_INSEGNAMENTO_ITA', 'like', '%' + teach + '%')
            .on('query-error', error => console.log("QUERY ERROR: " + error))
            .then(rows => {
                if (rows === undefined) {
                    reject(new Error("Rows is undefined"))
                } else {
                    resolve(rows)
                }
            })
            .catch(error => console.log('ERRORE: ' + error))
        })
    }

    searchInsByCode(code) { 
        return new Promise((resolve, reject) => {
            knex.select('*').from('conferimenti_docenti').where('cod_docente', code)
            .on('query-error', error => console.log("QUERY ERROR: " + error))
            .then(rows => {
                if (rows === undefined) {
                    reject(new Error("Rows is undefined"))
                } else {
                    resolve(rows)
                }
            })
            .catch(error => console.log('ERRORE: ' + error))
        })
    }

    loginDocente(username, password) {
        return new Promise((resolve, reject) => {
            knex.select('cod_docente').from('login_docenti').where('cod_docente', username).andWhere('password_docente', password)
            .on('query-error', error => console.log("QUERY ERROR: " + error))
            .then(rows => {
                if (rows === undefined) {
                    reject(new Error("Rows is undefined"))
                } else {
                    resolve(rows)
                }
            })
            .catch(error => console.log('ERRORE: ' + error))
        })
    }

}