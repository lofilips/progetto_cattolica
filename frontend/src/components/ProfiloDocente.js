import React from 'react'
import {Card, Row, Col, ListGroup} from 'react-bootstrap'
import '../css/ProfiloDocente.css'
import axios from 'axios'

const url = document.location.href
const stringaRicerca = url.split("/")[5]

let active = 0
let active0 = true
let active1 = false
let active2 = false
let active3 = false

let profileStyle = {
    display: 'block'
}

let insStyle = {
    display: 'none'
}

let ricStyle = {
    display: 'none'
}

let avvStyle = {
    display: 'none'
}

class ProfiloDocente extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            docenti: {},
            immagine: false
        }
    }

    async componentWillMount() {
        // console.log("stringaRicerca: " + stringaRicerca)
        await fetch(process.env.REACT_APP_URL_SERVER + "profilo_docente/" + stringaRicerca)
            .then(res => {
                if (res.status !== 200) {
                    console.log('ERROR. Status Code: ' + res.status)
                    return
                }
                console.log(res)
                return res.json();
            })
            .then(result => {
                this.setState(() => ({ docenti: result }))
            })
            

        await axios.get(process.env.REACT_APP_URL_SERVER + 'foto_docente/' + stringaRicerca)
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

    profile() {
        active = 0
        profileStyle = { display : 'block' }
        insStyle = { display : 'none' }
        ricStyle = { display : 'none' }
        avvStyle = { display : 'none' }
    }

    ins() {
        active = 1
        profileStyle = { display : 'none' }
        insStyle = { display : 'block' }
        ricStyle = { display : 'none' }
        avvStyle = { display : 'none' }
    }

    ric() {
        active = 2
        profileStyle = { display : 'none' }
        insStyle = { display : 'none' }
        ricStyle = { display : 'block' }
        avvStyle = { display : 'none' }
    }

    avv() {
        active = 3
        profileStyle = { display : 'none' }
        insStyle = { display : 'none' }
        ricStyle = { display : 'none' }
        avvStyle = { display : 'block' }
    }

    render() {

        let docente = []
        
        for ( let i = 0 ; i < this.state.docenti.length; i++) {

            let email = `mailto:${this.state.docenti[i]}`
            docente[i] = (
                <Card key={i}>
                    <Row>
                        <Col sm={3} md={3} lg={3}>
                            <img className="fotoProfiloD" src={this.state.docenti[i].cod_foto} alt=""/>
                        </Col>
                        <Col sm={6} md={6} lg={6}>
                            <Card.Body>
                                <Card.Title>
                                    <h3><b>{this.state.docenti[i].nom_docente + " " + this.state.docenti[i].cog_docente}</b></h3>
                                    <br/>
                                    {this.state.docenti[i].incarico_dir}
                                    <br/><br/>
                                    <h6>{"Facoltà: " + this.state.docenti[i].des_facolta + " - " + this.state.docenti[i].des_ssd}</h6>
                                    <h6>{"Sede: " + this.state.docenti[i].des_sede}</h6>
                                    <h6>{"Ruolo: " + this.state.docenti[i].des_ruolo}</h6>
                                    <h6>{"Dipartimento: " + this.state.docenti[i].des_struttura_aff.toUpperCase()}</h6>
                                </Card.Title>
                            </Card.Body>  
                        </Col>
                        <Col id ="contatti" sm={3} md={3} lg={3}>
                            <Card.Body>
                                <Card.Title>
                                    <h3><b>Contatti</b></h3>
                                </Card.Title>
                                <Card.Text>
                                    <br/><br/>
                                    <img id="icons" src={require('../assets/phone-icon.png')} alt=""/>&nbsp;&nbsp;&nbsp;
                                    <br/><br/>
                        
                                    <img id="icons" src={require('../assets/mail-icon.png')} alt=""/>&nbsp;&nbsp;&nbsp;<a href={email}>{this.state.docenti[i].email}</a>
                                </Card.Text>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            )
        }
        
        switch (active) {
            case 0:
                active0 = true
                active1 = false
                active2 = false
                active3 = false
                break;
            case 1:
                active0 = false
                active1 = true
                active2 = false
                active3 = false
                break;
            case 2:
                active0 = false
                active1 = false
                active2 = true
                active3 = false
                break;
            case 3:
                active0 = false
                active1 = false
                active2 = false
                active3 = true
                break;
            default:
                break;
        }

        if (this.state.immagine) {
            return (
            <div className="pagRicerca">
                {docente}
                <Row id="profilo">
                    <Col id="sezioni" sm={2} md={2} lg={2}>
                        <ListGroup variant="flush">
                            <a href="#pagRicerca"><ListGroup.Item onClick={this.profile} ref="profile" value="0" active={active0}><h5>PROFILO</h5></ListGroup.Item></a>
                            <a href="#pagRicerca"><ListGroup.Item onClick={this.ins} ref="ins" value="1" active={active1}><h5>INSEGNAMENTI</h5></ListGroup.Item></a>
                            <a href="#pagRicerca"><ListGroup.Item onClick={this.ric} ref="ric" value="2" active={active2}><h5>RICEVIMENTO</h5></ListGroup.Item></a>
                            <a href="#pagRicerca"><ListGroup.Item onClick={this.avv} ref="avv" value="3" active={active3}><h5>AVVISI</h5></ListGroup.Item></a>
                        </ListGroup>
                    </Col>
                    <Col id="contenuto" sm={10} md={10} lg={10}>
                        <div className="profileContent" style={profileStyle}>
                            CONTENUTO PROFILO
                        </div>
                        <div className="insContent" style={insStyle}>
                            <div className="header">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>
                                            <h1>Insegnamenti</h1>
                                            <br/>
                                        </Card.Title>
                                        <Card.Title>
                                            <table>
                                                <tr>
                                                    <td id="years">A.A. 2018-2019</td>
                                                    <td>A.A. 2017-2018</td>
                                                </tr>
                                            </table>
                                        </Card.Title>
                                        <Card.Text>
                                            <br/>
                                            <h4>DES_CORSO_ITA</h4><br/>
                                            Sede: DES_SEDE<br/>
                                            Facoltà: DES_FACOLTA_ITA<br/>
                                            Corsi di laurea: ?<br/><br/>
                                            <div className="options">
                                                <ListGroup className="cardProfilo">
                                                    <ListGroup.Item>Consulta il programma, orari del corso, date di esame</ListGroup.Item>
                                                    <ListGroup.Item id="dettaglio" action href=""><center>DETTAGLIO ></center></ListGroup.Item>
                                                </ListGroup>
                                                <ListGroup className="cardProfilo">
                                                    <ListGroup.Item>Scopri l’area dedicata per gli studenti del corso</ListGroup.Item>
                                                    <ListGroup.Item id="dettaglio" action href=""><center>ACCEDI A BLACKBOARD ></center></ListGroup.Item>
                                                </ListGroup>
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                        <div className="ricContent" style={ricStyle}>
                            CONTENUTO RICEVIMENTO
                        </div>
                        <div className="avvContent" style={avvStyle}>
                            CONTENUTO AVVISI
                        </div>
                    </Col>
                </Row>
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