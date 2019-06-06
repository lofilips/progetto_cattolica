import React, {Component} from 'react'


let docenti= [];
let url= 'http://localhost:3000/docenti?q='

let valore = document.location.href.split('=')[1];

function fullSearch(valore){  

  


    console.log("ci siamo anche qua " + valore)

    let fullResult = []
    
    let users =  Lafetch(valore);

    console.log("meno oki " + users.length)

    for ( let i = 0 ; i < users.length ; i++ ){    
       if (users[i].nom_docente.includes(valore.toUpperCase()) || users[i].cog_docente.includes(valore.toUpperCase()) || users[i].des_facolta.includes(valore.toUpperCase())){
        fullResult[i] = <li key={i}> {users[i].nom_docente + " " + users[i].cog_docente + " Insegnante di: " + users[i].des_facolta} </li>;
        console.log(fullResult[i] + "ciaooooooooooooooooooooooo")
        }
        console.log(fullResult[i] + "ciaoneeeee")

    }
        return (fullResult);


}





class About extends Component {

    constructor() {
        super()
        this.state = {
            search: "",
            users: []
        }
    }
    
    render() {

        return (
            <div>

            <ul>{fullSearch(valore)}</ul>
           
            </div>
        )
    }
}



function Lafetch(field)
{
fetch(url + field)
.then(res => {
    console.log(res);
    return res.json();
})
.then(json => { 
   docenti = json
   console.log(docenti)
   //this.setState({ users })
   
});
return docenti
}







export default About