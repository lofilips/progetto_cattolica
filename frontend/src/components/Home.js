import React, { Component } from 'react'
import '../Home.css'


let docenti = []

function getDocenti() {

    fetch('http://localhost:3000/docenti/')
        .then(res => {
            return res.json();
        })
        .then(json => { 
            docenti = json
        });

    return docenti
}

class Home extends Component {

    constructor() {
        super()
        this.state = {
            search: "",
            users: [],
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            search: event.target.value
        })
    }
   
    render() { 
        return (
            <>
                <div className="main-content">
                    <form className="casella_testo" action="http://localhost:3001/lista_docenti">
                        <input type="text" placeholder="Inserisci il docente che vuoi cercare" name="search" onChange={this.handleChange} autoComplete="off" spellCheck="false" />
                        <button type="submit" action="http://localhost:3001/lista_docenti"><i className="fa fa-search"></i></button>                       
                        <ul className="ulRisultati">
                            {Search(this.state.search)}
                        </ul>                        
                    </form>
                </div>


            </>
        )
    }
}

function Search(field){

    let users =  getDocenti(field);
    let result = [];
    let size = users.length;
    let j = 0;

    for ( let i = 0 ; i < size ; i++ ) {
        if ( (users[i].nom_docente.includes(field.toUpperCase()) || users[i].cog_docente.includes(field.toUpperCase()) || users[i].des_facolta.includes(field.toUpperCase())) && result.length < 3 && field.length > 2 ) {       
            if ( users[i].des_facolta === "" ) {
                result[j] = <li className="listaRisultati" key={i}>{ users[i].nom_docente + " " + users[i].cog_docente} <a key={j} href={users[i].cog_docente + "-" + users[i].nom_docente }>Vai al profilo</a></li>;
            } else {
                result[j] = <li className="listaRisultati" key={i}>{ users[i].nom_docente + " " + users[i].cog_docente + "  |  Insegnante di: " + users[i].des_facolta } <a key={j} href={users[i].cog_docente + "-" + users[i].nom_docente }>Vai al profilo</a></li>;
            }
        }
        j++;
    }

    if (field.length > 2 && result.length > 0) {   
        result[j+1]=<li className="listaRisultati" key={j+1}>Cerca {field} tra le facoltà <a key={j+1} href={field}>Cerca</a></li>
        result[j+2]=<li className="listaRisultati" key={j+2}>Cerca {field} tra le strutture <a key={j+1} href={field}>Cerca</a></li>
        result[j+3]=<li className="listaRisultati" key={j+3}>Cerca {field} tra i corsi di laurea <a key={j+1} href={field}>Cerca</a></li>
    }

    return (
        result
    );
}

export default Home