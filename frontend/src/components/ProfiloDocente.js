import React from 'react'
import {Card, Row, Col} from 'react-bootstrap'
import '../css/ListaDocenti.css'
import axios from 'axios'

const url = document.location.href
const stringaRicerca = url.split("/")[5]

class ProfiloDocente extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            docenti: [],
            immagine: false
        }
    }

    async componentWillMount() {
        // console.log("stringaRicerca: " + stringaRicerca)
        await fetch(process.env.REACT_APP_URL_SERVER + "profilo_docente/" + stringaRicerca)
            .then(res => {
                console.log(res)
                return res.json();
            })
            .then(result => {
                this.setState(() => ({ docenti: result }))
             // console.log(result)   
            })
            

        await axios.get(process.env.REACT_APP_URL_SERVER + 'foto_docente/' + this.state.docenti[0].cod_docente)
        .then(res => {
            console.log(res)
            if (res.data.base64Foto === null){ 
                this.state.docenti[0].cod_foto = require('../assets/foto_vuota.jpg') 
                this.state.immagine = true
            } else { 
                this.state.docenti[0].cod_foto = res.data.base64Foto 
                this.state.immagine = true
            }   
        })
        .catch(error => {
            console.log("ERRORE: " + error);
        })

        this.forceUpdate()
    }

    render() {

        let Docenti = this.state.docenti
        let docente = []

        for ( let i = 0 ; i < Docenti.length; i++) {

            docente[i] = (
                <Card key={i}>
                    <Row>
                        <Col sm={2.5} md={2.5} lg={2.5}>
                            <img className="fotoProfilo" src={this.state.docenti[i].cod_foto} alt=""/>
                        </Col>
                        <Col>
                            <Card.Body>
                                <Card.Title>
                                    <h3>{Docenti[i].nom_docente + " " + Docenti[i].cog_docente}</h3>
                                    <h4>{Docenti[i].incarico_dir}</h4>
                                    <h6>{"Facoltà: " + Docenti[i].des_facolta + " - " + Docenti[i].des_ssd}</h6>
                                    <h6>{"Sede: " + Docenti[i].des_sede}</h6>
                                    <h6>{"Ruolo: " + Docenti[i].des_ruolo}</h6>
                                    <h6>{"Dipartimento: " + Docenti[i].des_struttura_aff.toUpperCase()}</h6>
                                </Card.Title>
                                <Card.Text>
                                    {"Email: " + Docenti[i].email}
                                </Card.Text>
                            </Card.Body>  
                        </Col>
                    </Row>
                </Card>
            )
        }

        if (this.state.immagine) {
            return (
            <div className="pagRicerca">
                {docente}
            </div>  
            )
        } else {
            return (
                <div className="pagRicerca"><h1><center>Loading...</center></h1></div>
            ) 
        }
    }

}

export default ProfiloDocente
