import React, {Component} from 'react'

search(field){

    


        let users = [];
        let result = [];
        let size = users.length;
        let j = 0;
        
        for ( let i = 0 ; i < size ; i++ ) {
        if ( (users[i].nom_docente.includes(field) || users[i].cog_docente.includes(field) || users[i].des_facolta.includes(field)) && result.length < 5 && field.length > 0 ) {
            if ( users[i].des_facolta === "" ) {
                result[j] = <li className="listaRisultati" key={i}>{ users[i].nom_docente + " " + users[i].cog_docente} <a key={j} href={users[i].cog_docente + "-" + users[i].nom_docente }>Vai al profilo</a></li>;
            } else {
                result[j] = <li className="listaRisultati" key={i}>{ users[i].nom_docente + " " + users[i].cog_docente + "Insegnante di: " + users[i].des_facolta } <a key={j} href={users[i].cog_docente + "-" + users[i].nom_docente }>Vai al profilo</a></li>;
                }
            }
   

        return (
            result
        );
    }
}

export default Search