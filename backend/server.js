const docentiDB = require('./service/docenti-db-factory').DocentiDB();
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Express Server is listening...')
})

app.get('/docenti/:surname', (req, res) => {
    if (req.params.surname.length > 1) {
        docentiDB.searchProfBySurname(req.params.surname)
        .then(results => {
            res.send(results)
        })
        .catch(err => {
            console.log('Promise rejection error: ' + err)
        })
    }
})

app.get('/docenti/struttura/:structure', (req, res) => {
    docentiDB.searchProfByStructure(req.params.structure)
    .then(results => {
        console.log(results)
        res.send(results)
    })
    .catch(err => {
        console.log('Promise rejection error: ' + err)
    })
})

app.get('/docenti/facolta/:course', (req, res) => {
    docentiDB.searchProfByCourse(req.params.course)
    .then(results => {
        res.send(results)
    })
    .catch(err => {
        console.log('Promise rejection error: ' + err)
    })
})

app.get('/docenti/profilo_docente/:code', (req, res) => {
    docentiDB.searchProfByCode(req.params.code)
    .then(results => {
        res.send(results)
    })
    .catch(err => {
        console.log('Promise rejection error: ' + err)
    })
})

app.listen(4000, () => console.log('Express sta ascoltando sulla porta 4000'))