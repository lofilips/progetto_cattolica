import React, { Component } from 'react'
import '../css/LoginAreaRiservata.css'
import axios from 'axios'

function getCookieValue(cookieName){

    if (document.cookie.split(";")[0] !== undefined) {
        for(let i = 0; i < document.cookie.split(";").length; i++){
            if(document.cookie.split(";")[i].includes(cookieName) && cookieName.length > 0){

                return document.cookie.split(";")[i].split("=")[1]
            }
        }
        return null
      }
}

let errorDisplay = "none"

class LoginAreaRiservata extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            isLogged: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleSubmit(e) {
        e.preventDefault()

        axios.post('/docenti/login_area_riservata', {
            username: this.state.username,
            password: this.state.password
        }, { headers: {"Content-Type": "application/json"} })
        .then(res => {
            if (res.status === 200) {
                document.cookie = "token=" + res.data + ";path=/"
                this.setState({ isLogged: true})
                this.forceUpdate()
            } else {
                const error = new Error(res.error)
                throw error
            }
        })
        .catch(error => {
            errorDisplay = "block"
            console.error(error)
            this.forceUpdate()
        })

    }



    render() {

        

        if(this.state.isLogged){

            let user = getCookieValue('user')
            do{
                user = user.replace(".", " ")
            }while(user.includes("."))

            return(
                <div className="pagRicerca">
                    <center>
                    <br/>
                    <h1>CIAO {user},<br /> HAI ACCEDUTO CON SUCCESSO</h1>
                    <br/>
                    <button onClick={() => window.location.href = '/docenti/area_riservata'}>Vai all'area riservata</button>
                    <br/>
                    <br/>
                    <button onClick={() => window.location.href = '/docenti'}>Vai alla home</button>
                    </center>
                </div>
            )
        }else{
            return(
                <div className="pagLogin">
                    <center>
                        <div className="login">
                            <text>LOGIN DOCENTI UNICATT</text>
                            <div className="form">
                                <form name="form" onSubmit={this.handleSubmit}>
                                    <input autoComplete="off" className="input" placeholder="Username" name="username" value={this.state.username} onChange={this.handleChange} onClick={() => {errorDisplay = "none"; this.forceUpdate()}}></input>
                                    <input autoComplete="off" type="password" className="input" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} onClick={() => {errorDisplay = "none"; this.forceUpdate()}}></input>
                                    <br />
                                    <br />
                                    <span style={{color: "white", fontWeight: "bold", fontSize: "20px", display: errorDisplay}}>Errore! Username o password non corretti</span>
                                    <button id="button" type="submit" onClick={this.handleSubmit}>Login</button>
                                </form>
                            </div>
                        </div>
                    </center>
                </div>
            )    
        }


    }

}

export default LoginAreaRiservata