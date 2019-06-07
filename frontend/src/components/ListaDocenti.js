import React from 'react'

let j = 0
const stringaRicerca = document.location.href.split("=")[1]


class ListaDocenti extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            docenti: [],
            // x: null
            index: 10
        }
        this.caricaAltri = this.caricaAltri.bind(this)
    }

    componentDidMount() {
        
        console.log("stringaRicerca: " + stringaRicerca)

        fetch("http://localhost:3000/docenti?q=" + stringaRicerca)
            .then(res => {
                console.log(res)
                return res.json();
            })
            .then(docenti => {
                this.setState(() => ({ docenti }))
             console.log(docenti)   
            })
    }

    caricaAltri(){


        this.setState({
            index: this.state.index + 10
        })
        console.log("Index " + this.state.index)
    
    }

    render() { 
        let card = []
     
        const stylee = {
            border: "solid 0.5px",
            padding: "20px",
        }

        let bottonStyle
        let style

        const a = {
            float: "right",
        }

        console.log("Lunghezza array docenti: " + this.state.docenti.length + " " + card.length)

        j = 0

        for ( let i = 0 ; i < this.state.docenti.length; i++) {

            if ((this.state.docenti[i].nom_docente.includes(stringaRicerca.toUpperCase()) || this.state.docenti[i].cog_docente.includes(stringaRicerca.toUpperCase())) && j < this.state.index && stringaRicerca.length>0) {
                card[i] = (
                    <div key={i} style={stylee}>
                        <div className="nomedoc">{this.state.docenti[i].nom_docente + " " + this.state.docenti[i].cog_docente}</div>
                        <div className="facolta">{this.state.docenti[i].des_facolta}</div>
                        <div className="docemail">{this.state.docenti[i].email}</div>
                        <a href="/" style={a}>Vai al profilo</a>
                    </div>
                )
                j++
                console.log(j + " " + i)
            }
            if(stringaRicerca.length === 0){
                return ( 
                    <div style = {style = {minHeight : "1000px", padding: "50px"}}>
                       <center><h2>Non hai inserito nessun docente nella barra di ricerca</h2></center> 
                    
                    </div>
                 )
            }

        }


        if (card.length < this.state.index) {
          return ( 
               <div style = {style = {minHeight : "1000px"}}>
                    <div>{card}</div>
                    <div style={bottonStyle = {display: "none"}}><button refresh="true" onClick={this.caricaAltri}>Carica altri</button></div>
                </div>
            )
        } else {
            return ( 
                <div style = {style = {minHeight : "1000px"}}>
                    <div>{card}</div>
                    <div style={bottonStyle = {display: "block"}}><button  refresh="true" onClick={this.caricaAltri}>Carica altri</button></div>
                </div>
            )
        }
    }
}

export default ListaDocenti