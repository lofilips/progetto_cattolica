import React from 'react'
import {Card, Row, Col, ListGroup, Container} from 'react-bootstrap'
import '../css/ProfiloDocente.css'
import axios from 'axios'

const url = document.location.href
const stringaRicerca = url.split("/")[5]

let active0 = true
let active1 = false
let active2 = false
let active3 = false

let profileStyle = { display: 'block' }
let insStyle = { display: 'none' }
let ricStyle = { display: 'none' }
let avvStyle = { display: 'none' }

let years1Style = {
    borderBottom: '2px solid #000',
    paddingBottom: '3px',
}

let years2Style = {
    borderBottom: '',
    paddingBottom: '',
}

class ProfiloDocente extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            docenti: {},
            immagine: false,
            insegnamenti: []
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

        await fetch(process.env.REACT_APP_URL_SERVER + "insegnamenti2/" + stringaRicerca)
        .then(res => {
            if (res.status !== 200) {
                console.log('ERROR. Status Code: ' + res.status)
                return
            }
            return res.json();
        })
        .then(result => {
            this.setState(() => ({ insegnamenti: result }))
        })

        this.forceUpdate()
    }

    profile() {
        active0 = true
        active1 = false
        active2 = false
        active3 = false
        profileStyle = { display : 'block' }
        insStyle = { display : 'none' }
        ricStyle = { display : 'none' }
        avvStyle = { display : 'none' }
    }

    ins() {
        active0 = false
        active1 = true
        active2 = false
        active3 = false
        profileStyle = { display : 'none' }
        insStyle = { display : 'block' }
        ricStyle = { display : 'none' }
        avvStyle = { display : 'none' }
        years1Style = {
            borderBottom: '2px solid #000',
            paddingBottom: '3px',
            color: 'black'
        }
        
        years2Style = {
            borderBottom: '',
            paddingBottom: '',
            color: 'black'
        }
    }

    ric() {
        active0 = false
        active1 = false
        active2 = true
        active3 = false
        profileStyle = { display : 'none' }
        insStyle = { display : 'none' }
        ricStyle = { display : 'block' }
        avvStyle = { display : 'none' }
    }

    avv() {
        active0 = false
        active1 = false
        active2 = false
        active3 = true
        profileStyle = { display : 'none' }
        insStyle = { display : 'none' }
        ricStyle = { display : 'none' }
        avvStyle = { display : 'block' }
    }

    years1() {
        years1Style = {
            borderBottom: '2px solid #000',
            paddingBottom: '3px',
            color: 'black'
        }
        
        years2Style = {
            borderBottom: '',
            paddingBottom: '',
            color: 'black'
        }
    }

    years2() {
        years1Style = {
            borderBottom: '',
            paddingBottom: '',
            color: 'black'
        }
        
        years2Style = {
            borderBottom: '2px solid #000',
            paddingBottom: '3px',
            color: 'black'
        }
    }

    render() {

        let docente = []

        for ( let i = 0 ; i < this.state.docenti.length; i++) {

            let email = `mailto:${this.state.docenti[i].email}`

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

        let insegnamento = []

        for ( let i = 0 ; i < this.state.insegnamenti.length; i++) {
                insegnamento[i] = (
                        <Card.Text key={i}>
                            <br/>
                            <h5>{this.state.insegnamenti[i].DES_INSEGNAMENTO_ITA}</h5><br/>
                            Sede: {this.state.insegnamenti[i].DES_SEDE}<br/>
                            Facoltà: {this.state.insegnamenti[i].DES_FACOLTA_ITA}<br/>
                            Corsi di laurea: {this.state.insegnamenti[i].DES_CORSO_ITA}<br/><br/>
                            <Container className="options">
                                <ListGroup className="cardProfilo">
                                    <ListGroup.Item>Consulta il programma, orari del corso, date di esame</ListGroup.Item>
                                    <a href=""><ListGroup.Item as="listGroup" action><center>DETTAGLIO ></center></ListGroup.Item></a>
                                </ListGroup>
                                <ListGroup className="cardProfilo">
                                    <ListGroup.Item>Scopri l’area dedicata per gli studenti del corso</ListGroup.Item>
                                    <a href=""><ListGroup.Item as="listGroup" action><center>ACCEDI A BLACKBOARD ></center></ListGroup.Item></a>
                                </ListGroup>
                            </Container>
                            <br/><br/>
                            <hr/>
                        </Card.Text>
                )
                
        }

        if (this.state.immagine) {
            return (
            <div className="pagRicerca">
                {docente}
                <Row className="profilo">
                    <Col sm={2} md={2} lg={2}>
                        <ListGroup as="opzioniProfilo" variant="flush">
                            <a href="#pagRicerca"><ListGroup.Item as="items" onClick={this.profile} active={active0}><h5><b>PROFILO</b></h5></ListGroup.Item></a>
                            <a href="#pagRicerca"><ListGroup.Item as="items" onClick={this.ins} active={active1}><h5><b>INSEGNAMENTI</b></h5></ListGroup.Item></a>
                            <a href="#pagRicerca"><ListGroup.Item as="items" onClick={this.ric} active={active2}><h5><b>RICEVIMENTO</b></h5></ListGroup.Item></a>
                            <a href="#pagRicerca"><ListGroup.Item as="items" onClick={this.avv} active={active3}><h5><b>AVVISI</b></h5></ListGroup.Item></a>
                        </ListGroup>
                    </Col>
                    <Col className="contenuto" sm={10} md={10} lg={10}>
                        <div className="profileContent" style={profileStyle}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        <h3><b>Profilo</b></h3>
                                        <br/>
                                        <hr/>
                                    </Card.Title>
                                    <Card.Text>
                                        <br/>
                                        Contenuto profilo...
                                        <br/><br/>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="insContent" style={insStyle}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        <h3><b>Insegnamenti</b></h3>
                                        <br/>
                                        <hr/>
                                    </Card.Title>
                                    <Card.Title>
                                        <Row>
                                            <Col as="years" sm={2} md={2} lg={2}><a href="#" style={years1Style} onClick={this.years1}>A.A. 2018-2019</a></Col>
                                            <Col as="years" sm={2} md={2} lg={2}><a href="#" style={years2Style} onClick={this.years2}>A.A. 2017-2018</a></Col>
                                        </Row>
                                        <hr/>
                                    </Card.Title>
                                        <div className="cardText">{insegnamento}</div>
                                </Card.Body>
                            </Card>
                            <br/><br/>
                        </div>
                        <div className="ricContent" style={ricStyle}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        <h3><b>Ricevimento</b></h3>
                                        <br/>
                                        <hr/>
                                    </Card.Title>
                                    <Card.Text>
                                        <br/>
                                        Contenuto ricevimento...
                                        <br/><br/>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="avvContent" style={avvStyle}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        <h3><b>Avvisi</b></h3>
                                        <br/>
                                        <hr/>
                                    </Card.Title>
                                    <Card.Text>
                                        <br/>
                                        Contenuto avvisi...
                                        <br/><br/>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>  
            )
        } else {
            return (
                <div className="pagRicercaLoad" style={{paddingTop: "200px", minHeight: "1000px"}}><h1><center>Loading...</center></h1></div>
            ) 
        }
    }

}

export default ProfiloDocente