import React, { Component } from 'react'
import '../css/Login.css'
import axios from 'axios'

class LoginAreaRiservata extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
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
                console.log(res);
                document.cookie = "token=" + res.data + ";"
                this.props.history.push('/docenti/area_riservata')
            } else {
                const error = new Error(res.error)
                throw error
            }
        })
        .catch(error => console.error(error))

    }

    render() {

        return(
            <div className="pagLogin">
                <center>
                    <div className="login">
                        <text>LOGIN DOCENTI UNICATT</text>
                        <div className="form">
                            <form name="form" onSubmit={this.handleSubmit}>
                                <input className="input" placeholder="Username" name="username" value={this.state.username} onChange={this.handleChange}></input>
                                <input className="input" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}></input>
                                <button id="button" type="submit" onClick={this.handleSubmit}>Login</button>
                            </form>
                        </div>
                        <br /><a className="utility" href="">- CAMBIA PASSWORD</a> 
                        <br /><a className="utility" href="">- PASSWORD SMARRITA?</a> 
                        <br /><a className="utility" href="">- USERNAME SMARRITO?</a>
                    </div>
                </center>
            </div>
        )
    }

}

export default LoginAreaRiservata