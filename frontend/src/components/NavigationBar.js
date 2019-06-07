import React from 'react'
import { Navbar, Nav, Container, Row, Col, Image } from 'react-bootstrap'
import styled from 'styled-components'
import '../NavigationBar.css'

const Styles = styled.div`

  .navbar {
        background-color: #032647;
        height: 3vh;
  }

  .nav-link {
      color: white !important;
  }

  &:hover {
      color: grey;
  }

`;

function NavigationBar() {
    return (
        <>
        <Container fluid>
        <Styles>
            <Navbar >
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Item><Nav.Link href="https://login.unicatt.it/sso/login?RC=OK-LoginForNonToken&resource_url=https%3A%2F%2Fdocenti.unicatt.it%3A443%2Fppd2%2Fbackoffice%2Fdocenti%2Fv1%2Flogin%2Fit-IT&requested_proto=http&requested_meth=GET&requester_ip=172.31.32.250">AREA RISERVATA</Nav.Link></Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Styles>
                    <Row>
                        <Col sm="4">
                            <a href="https://www.unicatt.it/"><Image src="https://docenti.unicatt.it/ppd2/it/assets/img/logo-unicatt.jpg" alt="" /></a>
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