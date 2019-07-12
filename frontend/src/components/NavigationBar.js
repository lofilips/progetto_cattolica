import React from 'react'
import { Navbar, Nav, Container, Row, Col, Image } from 'react-bootstrap'
import '../css/NavigationBar.css'
import logo from '../assets/logo-unicatt.jpg'

function logout(){

    if(document.cookie.split(";")[0] !== undefined){
        for(let i = 0; i < document.cookie.split(";").length; i++){
          if(document.cookie.split(";")[i].includes('token')){
          //console.log(document.cookie.split(";")[i].split("=")[1])
          document.cookie = "token=; expires=Thu, 01-Jan-70 00:00:01 GMT;"
          window.location.href = '/docenti'
          }
        }
        return null
      }

}

function getCookieValue(){

    if(document.cookie.split(";")[0] !== undefined){
        for(let i = 0; i < document.cookie.split(";").length; i++){
          if(document.cookie.split(";")[i].includes('token') && document.cookie.split(";")[i].split("=")[1].length > 5){
          return document.cookie.split(";")[i].split("=")[1]
          }
        }
        return null
      }
}

function NavigationBar() {

    if(getCookieValue() !== null) {
        return (
            <>
                <Container fluid className="main">
                    <Navbar >
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Item><Nav.Link href="/docenti/area_riservata">CIAO, VAI ALL TUA </Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link href="/docenti/area_riservata">AREA RISERVATA</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link onClick={logout}>LOGOUT</Nav.Link></Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <Row className="heady">
                        <Col sm="4">
                            <a href="/docenti"><Image src={logo} alt="" /></a>
                        </Col>
                        <Col sm="7">
                            <span id="title">DOCENTI CATTOLICA</span>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    } else {
        return (
            <>
                <Container fluid className="main">
                    <Navbar >
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Item><Nav.Link href="/docenti/area_riservata">AREA RISERVATA</Nav.Link></Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <Row className="heady">
                        <Col sm="4">
                            <a href="/docenti"><Image src={logo} alt="" /></a>
                        </Col>
                        <Col sm="7">
                            <span id="title">DOCENTI CATTOLICA</span>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default NavigationBar


