import React from 'react'
import { Button } from 'react-bootstrap'
import '../css/ListaDocenti.css'
import Cards from './Cards'
import axios from 'axios'

const url = document.location.href
let stringaRicerca = url.split("=")[1]
const filtro = url.split("/")[5]
let newStringa = stringaRicerca

class ListaDocenti extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            docenti: [],
            index: 10,
            immagine: []
        }
        this.caricaAltri = this.caricaAltri.bind(this)
    }

    async componentDidMount() {
        console.log(stringaRicerca)
        console.log(filtro)

        let count = false
        do {
            count = false
            if (stringaRicerca.charAt(0) === "+") {
                stringaRicerca = stringaRicerca.slice(1)
                count = true
            }
            if (stringaRicerca.charAt(stringaRicerca.length -1) === "+"){
                stringaRicerca = stringaRicerca.slice(0, -1)
                count = true
            }
            // console.log(stringaRicerca + " " + stringaRicerca.length)
        } while (count === true);

        do {
            count = false
            if (stringaRicerca.includes('+')) {
                stringaRicerca = stringaRicerca.replace('+', '%20')
                count = true
            }
        } while (count === true)

        if (filtro !== 'struttura' && filtro !== 'facolta' && filtro !== 'insegnamenti') { 
            await axios.get(process.env.REACT_APP_URL_SERVER + stringaRicerca)
            .then(res => {
                console.log(res.data)
                this.setState({ docenti: res.data })
            })
            .catch(error => {
                console.log("ERRORE: " + error);
            })
        }

        if (filtro === 'struttura') { 
            await axios.get(process.env.REACT_APP_URL_SERVER + "struttura/" + stringaRicerca)
            .then(res => {
                console.log(res.data)
                this.setState({ docenti: res.data })
            })
            .catch(error => {
                console.log("ERRORE: " + error);
            })
        }

        if (filtro === 'facolta') { 
            await axios.get(process.env.REACT_APP_URL_SERVER + 'facolta/' + stringaRicerca)
            .then(res => {
                console.log(res.data)
                this.setState({ docenti: res.data })
            })
            .catch(error => {
                console.log("ERRORE: " + error);
            })
        }

        if (filtro === 'insegnamenti') { 
            await axios.get(process.env.REACT_APP_URL_SERVER + 'insegnamenti1/' + stringaRicerca)
            .then(res => {
                console.log(res.data)
                this.setState({ docenti: res.data })
            })
            .catch(error => {
                console.log("ERRORE: " + error);
            })
        }

        for (let i = 0 ; i < this.state.docenti.length ; i++) { 
            await axios.get(process.env.REACT_APP_URL_SERVER + 'foto_docente/' + this.state.docenti[i].cod_docente)
            .then(res => {
                //console.log(res)
                if (res.data.base64Foto === null) { 
                    this.state.docenti[i].cod_foto = require('../assets/foto_vuota.jpg') 
                    this.state.immagine[i] = i 
                } else { 
                    this.state.docenti[i].cod_foto = res.data.base64Foto 
                    this.state.immagine[i] = i 
                }   
                this.forceUpdate()
            })
            .catch(error => {
                console.log("ERRORE: " + error);
            }) 
        }
    }

    caricaAltri() {
        this.setState({
            index: this.state.index + 10
        })
    }

    render() { 

        let card = []
        let j = 0

        for ( let i = 0 ; i < this.state.docenti.length; i++) {
            if (j < this.state.index && stringaRicerca.length > 0) {
                card[i] = Cards(this.state.docenti, i, url)
                j++
            }
        }

        while (newStringa.includes("+")) {
            newStringa = newStringa.replace("+", " ")
        }
        while (newStringa.includes("%20")) {
            newStringa = newStringa.replace("%20", " ")
        }
        while (newStringa.includes("%27")) {
            newStringa = newStringa.replace("%27", "'")
        }
        while (newStringa.includes("%C3%A0")) {
            newStringa = newStringa.replace("%C3%A0", "à")
        }
        while (newStringa.includes("%C3%A8")) {
            newStringa = newStringa.replace("%C3%A8", "è")
        }
        while (newStringa.includes("%C3%A9")) {
            newStringa = newStringa.replace("%C3%A9", "é")
        }
        while (newStringa.includes("%C3%AC")) {
            newStringa = newStringa.replace("%C3%AC", "ì")
        }
        while (newStringa.includes("%C3%B2")) {
            newStringa = newStringa.replace("%C3%B2", "ò")
        }
        while (newStringa.includes("%C3%B9")) {
            newStringa = newStringa.replace("%C3%B9", "ù")
        }

        if (stringaRicerca.length === 0 || stringaRicerca === '+') {    
            return ( 
                <div Style="min-height: 600px; display: flex; justify-content: center; align-items: center; padding: 50px">
                    <center><h2>Non hai inserito nessun docente, struttura o facoltà nella barra di ricerca</h2></center> 
                </div>
            )
        }

        if (this.state.docenti.lenght === 0 || card.length === 0) {
            return (
                <div className="pagRicerca">
                    <h3 className="risRicerca">Nessun risultato trovato per "{newStringa}"</h3>
                </div>
            )
        }

        if (this.state.immagine.length >= 5 || this.state.immagine.length === this.state.docenti.length) { 

            let renderClass
            
            if (j < this.state.index) {
                renderClass = 'buttonHidden'
            } else {
                renderClass = 'buttonVisible'
            }

            if (filtro === 'struttura') {            
                return (
                    <div className="pagRicerca">
                        <br/>
                        <h3>Risultati per "{newStringa}" in Strutture:</h3><br/>
                        {card}<br />
                        <center><Button variant="primary" className={renderClass} onClick={this.caricaAltri}>Carica altri</Button></center>
                        <br/>
                    </div>
                )
            }

            if (filtro === 'facolta') {
                return (
                    <div className="pagRicerca">
                        <br/>
                        <h3>Risultati per "{newStringa}" in Facoltà:</h3><br/>
                        {card}<br />
                        <center><Button variant="primary" className={renderClass} onClick={this.caricaAltri}>Carica altri</Button></center>
                        <br/>
                    </div>
                )
            }

            if (filtro === 'insegnamenti') {
                return (
                    <div className="pagRicerca">
                        <br/>
                        <h3>Risultati per "{newStringa}" in Insegnamenti:</h3><br/>
                        {card}<br />
                        <center><Button variant="primary" className={renderClass} onClick={this.caricaAltri}>Carica altri</Button></center>
                        <br/>
                    </div>
                )
            }

            return (
                <div className="pagRicerca">
                    <br/>
                    <h3>Risultati per "{newStringa}" in Docenti:</h3><br/>
                    {card}<br />
                    <center><Button variant="primary" className={renderClass} onClick={this.caricaAltri}>Carica altri</Button></center>
                    <br/>
                </div>
            )

        } else { 
            return (
                <div className="pagRicerca" style={{paddingTop: "200px"}}><h1><center>Loading... {this.state.immagine.length*20}%</center></h1></div>
            ) 
        } 
    }
}

export default ListaDocenti