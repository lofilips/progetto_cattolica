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
                        <Nav.Item><Nav.Link href="/">AREA RISERVATA</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link href="/">ENGLISH</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link href="/">CERCA</Nav.Link></Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Styles>
                    <Row>
                        <Col sm="4">
                            <Image src="https://docenti.unicatt.it/ppd2/it/assets/img/logo-unicatt.jpg" alt="" />
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