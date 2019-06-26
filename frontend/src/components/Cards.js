import React from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'

function Cards(docenti, i) {
    return (
        <Card className="carta" key={i}> 
            <Card.Header> 
                {docenti[i].des_struttura_aff.toUpperCase()} 
            </Card.Header> 
            <Row> 
                <Col sm={2.5} md={2.5} lg={2.5}> 
                    <img className="fotoProfilo" src={docenti[i].cod_foto} alt="Caricamento"/></Col> 
                <Col> 
                    <Card.Body> 
                        <Card.Title> 
                            <h3>{docenti[i].nom_docente + " " + docenti[i].cog_docente}</h3> 
                            <h6>{docenti[i].des_facolta}</h6> 
                        </Card.Title> 
                        <Card.Text> 
                            {docenti[i].email} 
                        </Card.Text> 
                        <Button variant="primary" href={process.env.REACT_APP_URL_BASE + "profilo_docente/" + docenti[i].cod_docente}>Vai al profilo</Button> 
                    </Card.Body> 
                </Col> 
            </Row> 
        </Card> 
    )
}

export default Cards