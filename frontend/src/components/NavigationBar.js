import React from 'react'
import { Navbar, Nav, Container, Row, Col, Image } from 'react-bootstrap'
import '../css/NavigationBar.css'
import logo from '../assets/logo-unicatt.jpg'

function NavigationBar() {
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

export default NavigationBar