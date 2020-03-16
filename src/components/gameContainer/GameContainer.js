import React, { Component } from 'react'
import Paper from './../paper/Paper';
import Scissors from './../scissors/Scissors';
import Rock from './../rock/Rock';
import styles from './styles.css'

class GameContainer extends Component {
    render() {
        console.log(this.props)
            return (
            <div className="choices">

                <div class="triangle__container">
                    <img className="triangle__img" src="./images/bg-triangle.svg" alt="" />
                </div>

                <Paper handleClick={this.props.handleClick} />
                <Scissors handleClick={this.props.handleClick}/>
                <Rock handleClick={this.props.handleClick}/>
            </div>
        )
    }
}


export default GameContainer