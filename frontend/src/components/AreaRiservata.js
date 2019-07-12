import React, { Component } from 'react'

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