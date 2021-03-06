import React from 'react'
import { Card, Row, Col, ListGroup, Container, Form, Button } from 'react-bootstrap'
import '../css/ProfiloDocente.css'
import axios from 'axios'
import RichTextArea from './RichTextArea'

let active0 = true
let active1 = false
let active2 = false
let active3 = false

let profileStyle = { display: 'block' }
let insStyle = { display: 'none' }
let ricStyle = { display: 'none' }
let avvStyle = { display: 'none' }

let years2018Style = {
    borderBottom: '2px solid #000',
    paddingBottom: '3px',
}

let years2017Style = {
    borderBottom: '',
    paddingBottom: '',
}

let annoAcc = true
let blackboard

let visDettaglio = 'hidden'
let visiModifica = 'none'

let disAppelli = 'none'
let disCalendario = 'none'
let disOrario = 'none'
let disProgramma = 'block'

function getCookieValue(cookieName){
    if (document.cookie.split(";")[0] !== undefined) {
        for(let i = 0; i < document.cookie.split(";").length; i++){
            if(document.cookie.split(";")[i].includes(cookieName) && cookieName.length > 0){

                return document.cookie.split(";")[i].split("=")[1]
            }
        }
        return null
      }
}

let codDocente = document.location.href.split("/")[5]

if (codDocente !== undefined) {
    codDocente = codDocente.includes("#") ? document.location.href.split("/")[5].split("#")[0] :  document.location.href.split("/")[5]
}

class ProfiloDocente extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            docenti: {},
            immagine: false,
            insegnamenti: [],
            dettaglio: false,
            profilo: [],
            ricevimento: [],
            contenutoProfilo: '',
            contenutoRicevimento: '',
            logged: false,
        }
        this.dettaglioDoc = this.dettaglioDoc.bind(this)
        this.handleProfileChange = this.handleProfileChange.bind(this)
        this.handleRicevimentoChange = this.handleRicevimentoChange.bind(this)
        this.modificaRicevimento = this.modificaRicevimento.bind(this)
        this.editMode = this.editMode.bind(this)
    }

    async componentDidMount() {
        // console.log("codDocente: " + codDocente)
        await fetch('/docenti/profilo_docente/' + codDocente)
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
            
        await axios.get('/docenti/foto_docente/' + codDocente)
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

        await fetch('/docenti/insegnamenti2/' + codDocente)
        .then(res => {
            if (res.status !== 200) {
                console.log('ERROR. Status Code: ' + res.status)
                return
            }
            console.log('STRINGA RICERCA: ' + codDocente)
            return res.json();
        })
        .then(result => {
            this.setState(() => ({ insegnamenti: result }))
        })
        
        await fetch('/docenti/contenuto_ricevimento/' + codDocente)
        .then(res => {
            if (res.status !== 200) {
                console.log('ERROR. Status Code: ' + res.status)
                return
            }
            return res.json();
        })
        .then(result => {
            this.setState(() => ({ ricevimento: result }))
            this.setState({contenutoRicevimento: this.state.ricevimento[0].contenuto_ricevimento})
        })

        await fetch('/docenti/contenuto_profilo/' + codDocente)
        .then(res => {
            if (res.status !== 200) {
                console.log('ERROR. Status Code: ' + res.status)
                return
            }
            return res.json();
        })
        .then(result => {
            this.setState(() => ({ profilo: result }))
            this.setState({contenutoProfilo: this.state.profilo[0].contenuto_profilo})
        })

        this.forceUpdate()
    }

    dettaglioDoc() {
        this.setState({dettaglio: !this.state.dettaglio})
        visDettaglio = 'visible'
        console.log("ciaone")
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
        years2018Style = {
            borderBottom: '2px solid #000',
            paddingBottom: '3px',
            color: 'black'
        }
        
        years2017Style = {
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

    years2018() {
        annoAcc = true
        years2018Style = {
            borderBottom: '2px solid #000',
            paddingBottom: '3px',
            color: 'black'
        }
        
        years2017Style = {
            borderBottom: '',
            paddingBottom: '',
            color: 'black'
        }
    }

    years2017() {
        annoAcc = false
        years2018Style = {
            borderBottom: '',
            paddingBottom: '',
            color: 'black'
        }
        
        years2017Style = {
            borderBottom: '2px solid #000',
            paddingBottom: '3px',
            color: 'black'
        }
    }

    handleProfileChange(event) {
        this.setState({ contenutoProfilo: event.target.value })
        // console.log(this.state.contenutoProfilo)
    }
    
    handleRicevimentoChange(event) {
        this.setState({ contenutoRicevimento: event.target.value })
        // console.log(this.state.contenutoRicevimento)
    }
    
    modificaRicevimento() {
        // console.log("contenuto ricevimento " + this.state.contenutoRicevimento)

        axios.put(`/docenti/modifica_ricevimento/${codDocente}/${this.state.contenutoRicevimento}`)
        .then(res => {
            console.log(res.status)
        })
        .catch(error => console.log(error))
        this.setState({logged: false})
        visiModifica = "block"
        this.forceUpdate()
        setTimeout(() => {
            visiModifica = "none"
            this.forceUpdate()
        }, 3000);
    }

    editMode(){
        if (getCookieValue('token') !== null && getCookieValue('user') !== null && getCookieValue('cod') === codDocente ) {
            console.log(getCookieValue('cod') + " " + codDocente)
            this.setState({logged: true})
            this.forceUpdate()
        } else {
            window.location.href = '/docenti/login_area_riservata'
        }
    }

    render() {
        console.log(this.state.logged)

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

        let insegnamento2017 = []
        let insegnamento2018 = []

        for ( let i = 0 ; i < this.state.insegnamenti.length; i++) {

            if(this.state.insegnamenti[i].LINK_BB === "") {
                blackboard = "hidden"
            } else {
                blackboard = "visible"
            }

            if (this.state.insegnamenti[i].ANNO_ACCADEMICO === 2018) {

                // console.log(this.state.insegnamenti[i].ANNO_ACCADEMICO)
                insegnamento2018[i] = (
                        <Card.Text key={i}>
                            <br/>
                            <h5>{this.state.insegnamenti[i].DES_INSEGNAMENTO_ITA}</h5><br/>
                            Sede: {this.state.insegnamenti[i].DES_SEDE}<br/>
                            Facoltà: {this.state.insegnamenti[i].DES_FACOLTA_ITA}<br/>
                            Corsi di laurea: {this.state.insegnamenti[i].DES_CORSO_ITA}<br/><br/>
                            <Container className="options">
                                <ListGroup className="cardProfilo">
                                    <ListGroup.Item>Consulta il programma, orari del corso, date di esame</ListGroup.Item>
                                    <button onClick={this.dettaglioDoc} className="insButton"><ListGroup.Item as="listGroup" action><center>DETTAGLIO ></center></ListGroup.Item></button>
                                </ListGroup>
                                <ListGroup className="cardProfilo" style={{visibility : blackboard}}>
                                    <ListGroup.Item>Scopri l’area dedicata per gli studenti del corso</ListGroup.Item>
                                    <a href="https://blackboard.unicatt.it"><ListGroup.Item as="listGroup" action><center>ACCEDI A BLACKBOARD ></center></ListGroup.Item></a>
                                </ListGroup>
                            </Container>
                            <br/><br/>
                            <hr/>
                            
                            <div className="dettaglio" style={{visibility: visDettaglio}}>
                                <div>
                                    <center><h5><strong>{this.state.insegnamenti[i].DES_INSEGNAMENTO_ITA}</strong></h5></center>
                                    <button id="buttonDettaglio" onClick={() => {visDettaglio = "hidden"; this.forceUpdate()}}><img id="imgDettaglio" src={require('../assets/x-mark.png')} alt="" /></button>
                                </div>
                                <hr />
                                <div style={{width: "100%", height: "fit-content"}}>
                                    <button className="dettaglioButton" onClick={() => {disProgramma = 'block'; disOrario = 'none'; disAppelli = 'none'; disCalendario = 'none'; this.forceUpdate()}}>Programma del corso</button>
                                    <button className="dettaglioButton" onClick={() => {disProgramma = 'none'; disOrario = 'block'; disAppelli = 'none'; disCalendario = 'none'; this.forceUpdate()}}>Orario lezione</button>
                                    <button className="dettaglioButton" onClick={() => {disProgramma = 'none'; disOrario = 'none'; disAppelli = 'block'; disCalendario = 'none'; this.forceUpdate()}}>Appelli</button>
                                    <button className="dettaglioButton" onClick={() => {disProgramma = 'none'; disOrario = 'none'; disAppelli = 'none'; disCalendario = 'block'; this.forceUpdate()}}>Calendario aula lezioni</button>
                                </div>
                                <hr />

                                <div className="dettaglioDettaglio" style={{display: disProgramma}}>
                                    {this.state.insegnamenti[i].LINK_PROGRAMMA === "" ? "Nessun programma trovato per questo corso" : this.state.insegnamenti[i].LINK_PROGRAMMA}
                                </div>

                                <div className="dettaglioDettaglio" style={{display: disOrario}}>
                                {this.state.insegnamenti[i].LINK_ORARI === "" ? "Nessun orario trovato per questo corso" : this.state.insegnamenti[i].LINK_ORARI}
                                </div>

                                <div className="dettaglioDettaglio" style={{display: disAppelli}}>
                                {this.state.insegnamenti[i].LINK_APPELLI === "" ? "Nessun appello trovato per questo corso" : this.state.insegnamenti[i].LINK_APPELLI}
                                </div>

                                <div className="dettaglioDettaglio" style={{display: disCalendario}}>
                                    Dettaglio calendario aula lezioni
                                </div>
                            </div>
                        </Card.Text>
                )
            } else if (this.state.insegnamenti[i].ANNO_ACCADEMICO === 2017){

                // console.log("-" + this.state.insegnamenti[i].ANNO_ACCADEMICO)
                insegnamento2017[i] = (
                    <Card.Text key={i}>
                        <br/>
                        <h5>{this.state.insegnamenti[i].DES_INSEGNAMENTO_ITA}</h5><br/>
                        Sede: {this.state.insegnamenti[i].DES_SEDE}<br/>
                        Facoltà: {this.state.insegnamenti[i].DES_FACOLTA_ITA}<br/>
                        Corsi di laurea: {this.state.insegnamenti[i].DES_CORSO_ITA}<br/><br/>
                        <Container className="options">
                            <ListGroup className="cardProfilo">
                                <ListGroup.Item>Consulta il programma, orari del corso, date di esame</ListGroup.Item>
                                <button onClick={this.dettaglioDoc} className="insButton"><ListGroup.Item as="listGroup" action><center>DETTAGLIO ></center></ListGroup.Item></button>
                            </ListGroup>
                            <ListGroup className="cardProfilo" style={{visibility : blackboard}}>
                                <ListGroup.Item>Scopri l’area dedicata per gli studenti del corso</ListGroup.Item>
                                <a href="https://blackboard.unicatt.it"><ListGroup.Item as="listGroup" action><center>ACCEDI A BLACKBOARD ></center></ListGroup.Item></a>
                            </ListGroup>
                        </Container>
                        <br/><br/>
                        <hr/>

                        
                        <div className="dettaglio" style={{visibility: visDettaglio}}>
                                <div>
                                    <center><h5><strong>{this.state.insegnamenti[i].DES_INSEGNAMENTO_ITA}</strong></h5></center>
                                    <button id="buttonDettaglio" onClick={() => {visDettaglio = "hidden"; this.forceUpdate()}}><img id="imgDettaglio" src={require('../assets/x-mark.png')} alt="" /></button>
                                </div>
                                <hr />
                                <div style={{width: "100%", height: "fit-content"}}>
                                    <button className="dettaglioButton" onClick={() => {disProgramma = 'block'; disOrario = 'none'; disAppelli = 'none'; disCalendario = 'none'; this.forceUpdate()}}>Programma del corso</button>
                                    <button className="dettaglioButton" onClick={() => {disProgramma = 'none'; disOrario = 'block'; disAppelli = 'none'; disCalendario = 'none'; this.forceUpdate()}}>Orario lezione</button>
                                    <button className="dettaglioButton" onClick={() => {disProgramma = 'none'; disOrario = 'none'; disAppelli = 'block'; disCalendario = 'none'; this.forceUpdate()}}>Appelli</button>
                                    <button className="dettaglioButton" onClick={() => {disProgramma = 'none'; disOrario = 'none'; disAppelli = 'none'; disCalendario = 'block'; this.forceUpdate()}}>Calendario aula lezioni</button>
                                </div>
                                <hr />

                                <div className="dettaglioDettaglio" style={{display: disProgramma}}>
                                    {this.state.insegnamenti[i].LINK_PROGRAMMA === "" ? "Nessun programma trovato per questo corso" : this.state.insegnamenti[i].LINK_PROGRAMMA}
                                </div>

                                <div className="dettaglioDettaglio" style={{display: disOrario}}>
                                {this.state.insegnamenti[i].LINK_ORARI === "" ? "Nessun orario trovato per questo corso" : this.state.insegnamenti[i].LINK_ORARI}
                                </div>

                                <div className="dettaglioDettaglio" style={{display: disAppelli}}>
                                {this.state.insegnamenti[i].LINK_APPELLI === "" ? "Nessun appello trovato per questo corso" : this.state.insegnamenti[i].LINK_APPELLI}
                                </div>

                                <div className="dettaglioDettaglio" style={{display: disCalendario}}>
                                    Dettaglio calendario aula lezioni
                                </div>
                            </div>
                    </Card.Text>
            )

            }
                
        }

        let contenutoProfilo = []
        let contenutoRicevimento = []

        for (let i = 0; i < this.state.profilo.length; i++) {
            if (!this.state.logged) {
                contenutoProfilo[i] = (
                    <Form.Group key={i}>
                        <Form.Control as="textarea" rows="20" readOnly={!this.state.logged} value={this.state.contenutoProfilo} onChange={this.handleProfileChange}>{this.state.contenutoProfilo}</Form.Control>
                        <br/>
                        <Button variant="primary" onClick={this.modificaProfilo} style={this.state.logged === false ? {display:"none"} : {display: "block"}}>Conferma modifica</Button>  
                    </Form.Group>
                )
            } else {
                contenutoProfilo[i] = (
                    <Form.Group key={i}>
                        <RichTextArea />
                        <br/>
                    </Form.Group>
                )
            }
        }

        for (let i = 0; i < this.state.ricevimento.length; i++) {
            contenutoRicevimento[i] = (
                <Form.Group key={i}>
                    <Form.Control as="textarea" rows="20" readOnly={!this.state.logged} value={this.state.contenutoRicevimento} onChange={this.handleRicevimentoChange}>{this.state.contenutoRicevimento}}</Form.Control>
                    <br/>
                    <Button variant="primary" onClick={this.modificaRicevimento} style={this.state.logged === false ? {display:"none"} : {display: "block"}}>Conferma modifica</Button>  
                    <br />
                    <br />
                    <div style={{color: "green", display: visiModifica}}>Modifica effettuata con successo <img src={require('../assets/confirm.png')} style={{width: "20px"}} alt=""/></div>
                </Form.Group>
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
                                        <h3><b>Profilo</b></h3> <Button className="editButton" variant="primary" style={getCookieValue('token') === null ? {display:"none"} : {display: "block"}} onClick={this.editMode}>Modifica...</Button>
                                        <br/>
                                        <hr/>
                                    </Card.Title>
                                    <Card.Text>
                                        <br/>
                                        {contenutoProfilo}
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
                                            <Col as="years" sm={2} md={2} lg={2}><a href="#pagRicerca" style={years2018Style} onClick={this.years2018}>A.A. 2018-2019</a></Col>
                                            <Col as="years" sm={2} md={2} lg={2}><a href="#pagRicerca" style={years2017Style} onClick={this.years2017}>A.A. 2017-2018</a></Col>
                                        </Row>
                                        <hr/>
                                    </Card.Title>
                                        <div id="cardText">{annoAcc === true ? insegnamento2018 : insegnamento2017}</div>
                                </Card.Body>
                            </Card>
                            <br/><br/>
                        </div>
                        <div className="ricContent" style={ricStyle}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        <h3><b>Ricevimento</b></h3> <Button className="editButton" variant="primary" style={getCookieValue('token') === null ? {display:"none"} : {display: "block"}} onClick={this.editMode}>Modifica...</Button>
                                        <br/>
                                        <hr/>
                                    </Card.Title>
                                    <Card.Text>
                                        <br/>
                                        {contenutoRicevimento}
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