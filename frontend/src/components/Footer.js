import React from 'react'

function Footer() {
    return (
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
    )
}

export default Footer