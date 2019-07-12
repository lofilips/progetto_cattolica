import React, { Component } from 'react'
const cookies = require('js-cookie')

const myStyle = {
    minHeight: 1000,
    padding: 100
}

class AreaRiservata extends Component {

    constructor() {
        super()
        this.state = {
        }
    }

    logout() {
        
        // document.cookie = 'token=deleted; Path=/docenti; Domain=localhost; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        // document.cookie = 'token=deleted; Path=/docenti; Domain=localhost; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        // localStorage.removeItem('token')
        // sessionStorage.removeItem('token')

        cookies.remove('token', { path: '/docenti' })
        
        console.log('Perchè non funzioni???')

    }
    
    render() {
        
        return (
            <>
                <div className="areaPrivata" style={myStyle}>
                    <br/>
                    <h1>Area Riservata</h1>
                    <br/>
                    {this.state.message}
                    <br/><br/>
                    <button onClick={this.logout}>Logout</button>
                </div>
            </>
        )
    }

}

export default AreaRiservata