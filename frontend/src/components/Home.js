import React, { Component } from 'react'
import '../Home.css'
import { Row, Col, } from 'react-bootstrap'

let docenti= [];
let url= 'http://localhost:3000/docenti?q='





function Lafetch(field)
{
fetch(url + field)
.then(res => {
    console.log(res);
    return res.json();
})
.then(json => { 
   docenti = json
   console.log(docenti)
   //this.setState({ users })
   
});
return docenti
}




    

class Home extends Component {

    constructor() {
        super()
        this.state = {
            search: "",
            users: []
        }

        this.handleChange = this.handleChange.bind(this)
       // this.Lafetch = this.Lafetch.bind(this)
    }

    handleChange(event) {
        this.setState ({
            search: event.target.value
        })
    }
   

    

    render() { 
        return (
            <>
            <div className="main-content">
                <form className="casella_testo" action='http://localhost:3001/about'>
                    <input type="text" placeholder="Inserisci il docente che vuoi cercare" name="search" onChange={this.handleChange} autoComplete="off" spellCheck="false" />
                   <button type="submit" ><i className="fa fa-search"></i></button>
                        
                   <ul className="ulRisultati">
                   {search(this.state.search)}
                   </ul>      
                        
                </form>
                
            </div>
            <div className="footer">
                <Row>
                    <Col sm="0" lg="1"></Col>
                    <Col sm="2" lg="2"><img src={require('../assets/logo2.jpg')} alt="Non funziona" />
                    </Col>
                    <Col sm="2" lg="2">
                        <a className="footer-links" href="/">CONTATTI</a>
                        <a className="footer-links" href="/">SOSTIENI L'UNIVERSITÀ</a>
                        <a className="footer-links" href="/">AREA STAMPA</a>
                        <a className="footer-links" href="/">CATTOLICANEWS</a>
                        <a className="footer-links" href="/">PRIVACY</a>
                        <a className="footer-links" href="/">COOKIES</a>
                    </Col>
                    <Col sm="2" lg="2">
                        <a className="footer-links" href="/">CLOUDMAIL</a>
                        <a className="footer-links" href="/">CLOUDMAIL ICATT</a>
                        <a className="footer-links" href="/">WIFI E EDUROAM</a>
                        <a className="footer-links" href="/">ACCESSIBILITA'</a>
                        <a className="footer-links" href="/">OFF-CAMPUS</a>
                        <a className="footer-links" href="/">INTRANET</a>
                    </Col>
                    <Col sm="2" lg="2">
                        <a className="footer-links" href="/">BIBLIOTECA</a>
                        <a className="footer-links" href="/">LIBRERIE</a>
                        <a className="footer-links" href="/">EDUCATT</a>
                        <a className="footer-links" href="/">CV ONLINE</a>
                        <a className="footer-links" href="/">ALBO FORNITORI</a>
                        <a className="footer-links" href="/">VERIFICA CERTIFICATI E AUTOCERTIFICAZIONI</a>
                    </Col>
                    <Col sm="2" className="social" lg="2">
                        <p>Segui Università Cattolica su:</p>
                        <a className="footer-links-social" href="/"><img src={require('../assets/facebook.png')} alt=""/></a>
                        <a className="footer-links-social" href="/"><img src={require('../assets/twitter.png')} alt=""/></a>
                        <a className="footer-links-social" href="/"><img src={require('../assets/instagram.png')} alt=""/></a>
                        <a className="footer-links-social" href="/"><img src={require('../assets/linkedin-logo.png')} alt=""/></a>
                        <a className="footer-links-social" href="/"><img src={require('../assets/youtube.png')} alt=""/></a>
                    </Col>
                    <Col sm="0" lg="1"></Col>
                </Row>
                <Row>
                    <Col className="copyright" sm="12" lg="12">Copyright ©2011-2019 - Università Cattolica del Sacro Cuore - Tutti i diritti riservati (Versione 2.0.3)</Col>
                </Row>
            </div>
            </>
        )
    }
}


function search(field){

    console.log(document.referrer + " ci siamo " + document.location.href)



    let users =  Lafetch(field);
    let result = [];
    let size = users.length;
    let j = 0;
    
    for ( let i = 0 ; i < size ; i++ ) {
        
    if ( (users[i].nom_docente.includes(field.toUpperCase()) || users[i].cog_docente.includes(field.toUpperCase()) || users[i].des_facolta.includes(field.toUpperCase())) && result.length < 3 && field.length > 3 ) {
        
        if ( users[i].des_facolta === "" ) {
            result[j] = <li className="listaRisultati" key={i}>{ users[i].nom_docente + " " + users[i].cog_docente} <a key={j} href={users[i].cog_docente + "-" + users[i].nom_docente }>Vai al profilo</a></li>;
        } else {
            result[j] = <li className="listaRisultati" key={i}>{ users[i].nom_docente + " " + users[i].cog_docente + " Insegnante di: " + users[i].des_facolta } <a key={j} href={users[i].cog_docente + "-" + users[i].nom_docente }>Vai al profilo</a></li>;
            }
        }
        j++;
        console.log("ciclo" + users[i].cog_docente)
    }

if(field.length > 3 && result.length > 0){   
    result[j+1]=<li className="listaRisultati" key={j+1}>Cerca {field} tra le facoltà <a key={j+1} href={field}>Cerca</a></li>
    result[j+2]=<li className="listaRisultati" key={j+2}>Cerca {field} tra le strutture <a key={j+1} href={field}>Cerca</a></li>
    result[j+3]=<li className="listaRisultati" key={j+3}>Cerca {field} tra i corsi di laurea <a key={j+1} href={field}>Cerca</a></li>
}

    return (
        result
    );
}


export default Home