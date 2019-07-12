import React from 'react'
import { Navbar, Nav, Container, Row, Col, Image } from 'react-bootstrap'
import '../css/NavigationBar.css'
import logo from '../assets/logo-unicatt.jpg'


function logout(){

    if(document.cookie.split(";")[0] !== undefined){
        for(let i = 0; i < document.cookie.split(";").length; i++){
            if(document.cookie.split(";")[i].includes('token')){
                //console.log(document.cookie.split(";")[i].split("=")[1])
                document.cookie = "token=; expires=Thu, 01-Jan-70 00:00:01 GMT;path=/"
                document.cookie = "cod=; expires=Thu, 01-Jan-70 00:00:01 GMT;path=/"
                document.cookie = "user=; expires=Thu, 01-Jan-70 00:00:01 GMT;path=/"
                window.location.href = '/docenti'
            }
        }
        return null
      }

}

function getCookieValue(cookieName){

    if(document.cookie.split(";")[0] !== undefined){
        for(let i = 0; i < document.cookie.split(";").length; i++){
            if(document.cookie.split(";")[i].includes(cookieName) && cookieName.length > 0){

                return document.cookie.split(";")[i].split("=")[1]
            }
        }
        return null
      }
}

function NavigationBar() {

    if(getCookieValue('token') !== null) {

        let user = getCookieValue('user')
        do{
            user = user.replace(".", " ")
        }while(user.includes("."))
        
        return (
            <>
                <Container fluid className="main">
                    <Navbar >
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Item><Nav.Link href="/docenti/area_riservata">CIAO {user}</Nav.Link></Nav.Item>
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


