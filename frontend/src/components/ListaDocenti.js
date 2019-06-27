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

        if (filtro !== 'struttura' && filtro !== 'facolta' ) { 
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

        let rest, mime, client; 
        rest = require('rest'); 
        mime = require('rest/interceptor/mime'); 
        client = rest.wrap(mime); 
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

        for (let i = 0 ; i < this.state.docenti.length ; i++) { 
            let response = await client({ path: proxyUrl + process.env.REACT_APP_URL_FOTO_DOCENTI + this.state.docenti[i].cod_docente }); 
            if (response.entity.base64Foto === null){ 
                this.state.docenti[i].cod_foto = require('../assets/foto_vuota.jpg') 
                this.state.immagine[i] = i 
            } else { 
                this.state.docenti[i].cod_foto = response.entity.base64Foto 
                this.state.immagine[i] = i 
            }  
            // console.log("Immagini caricate: " + this.state.immagine.length)  
            this.forceUpdate()
        }

    }

    caricaAltri(){
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

        while(newStringa.includes("+")){
            newStringa = newStringa.replace("+", " ")
        }
        while(newStringa.includes("%27")){
            newStringa = newStringa.replace("%27", "'")
        }
        while(newStringa.includes("%C3%A0")){
            newStringa = newStringa.replace("%C3%A0", "à")
        }
        while(newStringa.includes("%C3%A8")){
            newStringa = newStringa.replace("%C3%A8", "è")
        }
        while(newStringa.includes("%C3%A9")){
            newStringa = newStringa.replace("%C3%A9", "é")
        }
        while(newStringa.includes("%C3%AC")){
            newStringa = newStringa.replace("%C3%AC", "ì")
        }
        while(newStringa.includes("%C3%B2")){
            newStringa = newStringa.replace("%C3%B2", "ò")
        }
        while(newStringa.includes("%C3%B9")){
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
        if (j < this.state.index) {
            return (
                <div className="pagRicerca">
                    <br/>
                    <h3>Risultati per "{newStringa}" in Docenti:</h3><br/>
                    {card}<br />
                    <center><Button variant="primary" className="buttonHidden" onClick={this.caricaAltri}>Carica altri</Button></center>
                    <br/>
                </div>
            )
        } else {
            return (
                <div className="pagRicerca">
                    <br/>
                    <h3>Risultati per "{stringaRicerca}" in Docenti:</h3><br/>
                    {card}<br />
                    <center><Button variant="primary" className="buttonVisible" onClick={this.caricaAltri}>Carica altri</Button></center>
                    <br/>
                </div>
            )   
        }
        } else { 
            return(<div className="pagRicerca" style={{paddingTop: "200px"}}><h1><center>Loading...{this.state.immagine.length*20}%</center></h1></div>) 
        } 

    }
}

export default ListaDocenti