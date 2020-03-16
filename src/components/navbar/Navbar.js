import React, { Component } from 'react'
import styles from './styles.css'

class Navbar extends Component {
    render() {
        const {score} = this.props
        
        return (
            <nav>
                <img src="./images/logo.svg" alt='logo' />
                <div class="scoreboard">
                    <h2 class="scoreboard-title">Score</h2>
                    <p class="score"> {score}</p>
                </div>
            </nav>
        )
    }
}


export default Navbar