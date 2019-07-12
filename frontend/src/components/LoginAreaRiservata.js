import React, { Component } from 'react'
import '../css/LoginAreaRiservata.css'
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
                this.props.history.push('/docenti/area_riservata')
            } else {
                const error = new Error(res.error)
                throw error
            }
        })
        .catch(error => console.error(error))

    }

    render() {
        const { username, password } = this.state
        return (
            <div className="loginPage">
                <h1>Login Form</h1>
                <br/>
                <form name="form" onSubmit={this.handleSubmit}>
                    <input type="text" name="username" value={username} placeholder="Username" onChange={this.handleChange} />
                    <br/><br/>
                    <input type="password" name="password" value={password} placeholder="Password" onChange={this.handleChange} />
                    <br/><br/>
                    <button>Accedi</button>
                    <br/><br/>
                </form>
            </div>
        )
    }

}

export default LoginAreaRiservata