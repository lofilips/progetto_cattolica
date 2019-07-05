import React from 'react'
import { Row, Col, } from 'react-bootstrap'
import '../css/Footer.css'

function Footer() {
    return (
        <div className="footer">
        <Row>
            <Col sm="0" lg="1"></Col>
            <Col sm="2" lg="2"><a href="/docenti"><img id="secondLogo" src={require('../assets/logo2.jpg')} alt="" /></a>
            </Col>
            <Col  className="colonna" sm="2" lg="2">
                <a className="footer-links" href="https://www.unicatt.it/la-cattolica-contatti-e-indirizzario">CONTATTI</a>
                <a className="footer-links" href="https://sostieni.unicatt.it/">SOSTIENI L'UNIVERSITÀ</a>
                <a className="footer-links" href="https://www.unicatt.it/area-stampa">AREA STAMPA</a>
                <a className="footer-links" href="https://www.cattolicanews.it/">CATTOLICANEWS</a>
                <a className="footer-links" href="https://www.unicatt.it/generic-pages-privacy">PRIVACY</a>
                <a className="footer-links" href="https://www.unicatt.it/cookies">COOKIES</a>
            </Col>
            <Col  className="colonna" sm="2" lg="2">
                <a className="footer-links" href="https://www.unicatt.it/CloudMail">CLOUDMAIL</a>
                <a className="footer-links" href="https://www.unicatt.it/cloudmail-icatt">CLOUDMAIL ICATT</a>
                <a className="footer-links" href="https://www.unicatt.it/servizi-eduroam-e-wifi">WIFI E EDUROAM</a>
                <a className="footer-links" href="https://www.unicatt.it/accessibilita">ACCESSIBILITA'</a>
                <a className="footer-links" href="https://www.unicatt.it/off-campus">OFF-CAMPUS</a>
                <a className="footer-links" href="https://intranet.unicatt.it/">INTRANET</a>
            </Col>
            <Col className="colonna" sm="2" lg="2">
                <a className="footer-links" href="https://sbda.unicatt.it/">BIBLIOTECA</a>
                <a className="footer-links" href="https://www.unicatt.it/librerie">LIBRERIE</a>
                <a className="footer-links" href="https://educatt.unicatt.it/">EDUCATT</a>
                <a className="footer-links" href="https://www.unicatt.it/cv-online">CV ONLINE</a>
                <a className="footer-links" href="https://unicattolica.bravosolution.com/web/login.html">ALBO FORNITORI</a>
                <a className="footer-links" href="https://verificaautocertificazioni.unicatt.it/">VERIFICA CERTIFICATI E AUTOCERTIFICAZIONI</a>
            </Col>
            <Col className="social" sm="2" lg="2">
                <p>Segui Università Cattolica su:</p>
                <br/>
                <a className="footer-links-social" href="https://www.facebook.com/unicatt"><img src={require('../assets/facebook.png')} alt=""/></a>
                <a className="footer-links-social" href="https://twitter.com/unicatt"><img src={require('../assets/twitter.png')} alt=""/></a>
                <a className="footer-links-social" href="https://www.instagram.com/unicatt/"><img src={require('../assets/instagram.png')} alt=""/></a>
                <a className="footer-links-social" href="https://www.linkedin.com/school/universita-cattolica-del-sacro-cuore"><img src={require('../assets/linkedin-logo.png')} alt=""/></a>
                <a className="footer-links-social" href="https://www.youtube.com/user/younicatt"><img src={require('../assets/youtube.png')} alt=""/></a>
            </Col>
            <Col sm="0" lg="1"></Col>
        </Row>
        <Row>
            <Col className="copyright" sm="12" lg="12">Copyright ©2011-2019 - Università Cattolica del Sacro Cuore - Tutti i diritti riservati (Versione 2.0.3)</Col>
        </Row>
    </div>
    )
}

export default Footer