const axios = require('axios')
const docentiDB = require('./service/docenti-db-factory').DocentiDB();
const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const withAuth = require('./service/middleware')
const cookieParser = require('cookie-parser')

const app = express()

const secret = 'mysecret';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/docenti/login_area_riservata', (req, res) => {
    
    const { username, password } = req.body

    docentiDB.loginDocente(username, password)
    .then(results => {
        if (results.length === 1) {
            // console.log('Utente trovato')
            const payload = { username }
            const token = jwt.sign(payload, secret, {
                expiresIn: '1h'
            });
            // console.log('TOKEN '+ token);  
            let cod = results[0].cod_docente 
            let user = results[0].username_docente
            console.log(cod)
            res.append('Set-Cookie',['cod=' + cod + '; path=/;', 'user=' + user + '; path=/;'])                             
            res.send(token)
        } else {
            console.log('Errore: utente non trovato')
        }
    })
    .catch(err => console.log(err))
})

app.get('/docenti/checkToken', withAuth, (req, res) => {
    res.sendStatus(200)
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

app.get('/docenti/insegnamenti1/:teach', (req, res) => {
    docentiDB.searchProfByTeaching(req.params.teach)
    .then(results => {
        // console.log(results.data)
        res.send(results)
    })
    .catch(err => {
        console.log('Promise rejection error: ' + err)
    })
})

app.get('/docenti/foto_docente/:code', (req, res) => {
    axios.get(process.env.URL_FOTO_DOCENTI + req.params.code)
    .then(results => {
        //console.log(results.data)
        res.send(results.data)
    })           
    .catch(error => {
        console.log("ERROR: " + error);
    })

})

app.get('/docenti/insegnamenti2/:code', (req, res) => {
    docentiDB.searchInsByCode(req.params.code)
    .then(results => {
        // console.log(results.data)
        res.send(results)
    })
    .catch(err => {
        console.log('Promise rejection error: ' + err)
    })
})

app.get('/docenti/contenuto_profilo/:code', (req, res) => {
    docentiDB.getContenutoProfilo(req.params.code)
    .then(results => {
        // console.log(results.data)
        res.send(results)
    })
    .catch(err => {
        console.log('Promise rejection error: ' + err)
    })
})

app.put('/docenti/modifica_profilo/:code/:profile', (req, res) => {
    docentiDB.setContenutoProfilo(req.params.code, req.params.profile)
    .then(res => {
        res.sendStatus(200)
    })
    .catch(err => {
        console.log('Promise rejection error: ' + err)
    })
})

app.listen(4000)