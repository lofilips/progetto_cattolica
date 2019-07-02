const DocentiDB = require('../docenti-db');
const fetch = require('node-fetch')

module.exports = class MockDocentiDB extends DocentiDB {

    constructor() {
        super()
        console.log('USO L\'IMPLEMENTAZIONE CON JSON')
        console.log('Eseguire lo script \'JSON Server.bat\' presente nella cartella \'backend\'')
    }
    
    searchProfBySurname(surname) {
        return (
            fetch('http://localhost:4002/docenti?cog_docente_like=' + surname)
            .then(res => res.json())
            .then(data => {
                return data
            })
            .catch(error => console.error(error))
        )
    }

    searchProfByStructure(structure) {
        return (
            fetch('http://localhost:4002/docenti?des_struttura_aff_like=' + structure)
            .then(res => res.json())
            .then(data => {
                return data
            })
            .catch(error => console.error(error))
        )
    }

    searchProfByCourse(course) {
        return (
            fetch('http://localhost:4002/docenti?des_facolta_like=' + course)
            .then(res => res.json())
            .then(data => {
                return data
            })
            .catch(error => console.error(error))
        )
    }

    searchProfByCode(code) {
        return (
            fetch('http://localhost:4002/docenti?cod_docente_like=' + code)
            .then(res => res.json())
            .then(data => {
                return data
            })
            .catch(error => console.error(error))
        )
    }

}