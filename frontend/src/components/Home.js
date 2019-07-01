import React, { Component } from 'react'
import '../css/Home.css'
import getSuggestions from '../getSuggestions'
import axios from 'axios'

class Home extends Component {

    constructor() {
        super()
        this.state = {
            search: "",
            docenti: [],
        }
        this.handleChange = this.handleChange.bind(this)
    }

    async handleChange(event) {

        await this.setState({
            search: event.target.value
        })

        if (this.state.search.length > 2) {
            await axios.get(process.env.REACT_APP_URL_SERVER + this.state.search.trimLeft())
            .then(res => {
                // console.log(res.data)
                this.setState({ docenti: res.data })
            })
            .catch(error => {
                console.error(error);
            })

        }

    }

    render() {
        return (
            <>
                <div className="main-content">
                    <form className="casella_testo" action={process.env.REACT_APP_URL_BASE + "lista_docenti/"}>
                        <div className="bloccaCasella">
                            <input type="text" placeholder="Inserisci il docente che vuoi cercare" name="search" onChange={this.handleChange} autoComplete="off" />
                            <button type="submit" action={process.env.REACT_APP_URL_BASE + "lista_docenti/"}><i className="fa fa-search"></i></button>   
                        </div>                    
                        <ul className="ulRisultati">
                                {getSuggestions(this.state.docenti, this.state.search)}
                        </ul>                        
                    </form>
                </div>
            </>
        )
    }

}

export default Home