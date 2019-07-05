import React from 'react'

function getSuggestions(docenti, stringaRicerca){

    let result = []
    let j = 0
    let size = docenti.length
    let url = process.env.REACT_APP_URL_BASE

    for ( let i = 0 ; i < size ; i++ ) {
        if (result.length < 3 && stringaRicerca.length > 2 ) {       
            if ( docenti[i].des_facolta === "" ) {
                result[j] = <li className="listaRisultati" key={i}><img src={require('./assets/user.png')} alt="" style={{height: "30px", paddingRight: "20px", paddingLeft: "5px"}}/>{ docenti[i].nom_docente + " " + docenti[i].cog_docente} <a key={j} href={docenti[i].cog_docente + "-" + docenti[i].nom_docente }>Vai al profilo</a></li>;
            } else {
                result[j] = <li className="listaRisultati" key={i}><img src={require('./assets/user.png')} alt="" style={{height: "30px", paddingRight: "20px", paddingLeft: "5px"}}/>{ docenti[i].nom_docente + " " + docenti[i].cog_docente + "  |  Insegnante di: " + docenti[i].des_facolta } <a key={j} href={url + "profilo_docente/" + docenti[i].cod_docente}>Vai al profilo</a></li>;
            }
            j++
        }
    }

    if (stringaRicerca.trimLeft().length > 2) {   
        result[j+1]=<li className="listaRisultati" key={j+1}><img src={require('./assets/open-book.png')} alt="" style={{height: "35px", paddingRight: "15px"}}/>Cerca {stringaRicerca} tra le facoltà <a key={j+1} href={url + "lista_docenti/facolta/f=" + stringaRicerca}>Cerca</a></li>
        result[j+2]=<li className="listaRisultati" key={j+2}><img src={require('./assets/old-school.png')} alt="" style={{height: "35px", paddingRight: "15px"}}/>Cerca {stringaRicerca} tra le strutture <a key={j+2} href={url + "lista_docenti/struttura/s=" + stringaRicerca}>Cerca</a></li>
        result[j+3]=<li className="listaRisultati" key={j+3}><img src={require('./assets/college-graduation.png')} alt="" style={{height: "35px", paddingRight: "15px"}}/>Cerca {stringaRicerca} tra gli Insegnamenti <a key={j+3} href={url + "lista_docenti/insegnamenti/i=" + stringaRicerca}>Cerca</a></li>
    }

    return (
        result
    )
    
}

export default getSuggestions