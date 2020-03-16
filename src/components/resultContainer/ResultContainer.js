import React from 'react'
import styles from './styles.css'




class ResultContainer extends React.Component {

        constructor(props) {
                super(props);
                console.log(props)
                this.state = {
                        setLoading: this.props.setLoading
                };
                console.log(props)
        }

        timer = null

        componentDidMount = () => {
                console.log('corrio ')
                this.timer = setTimeout(() => this.state.setLoading(), 3000)
        }

        componentWillUnmount = () => {
                clearTimeout(this.timer);
        }






        render() {

                return (
                        <div class="resultContainer">
                                <div class="resultContainer__player">
                                        {
                                                this.props.mySelection
                                        }

                                        <p class="info-game">You picked</p>
                                </div>
                                {this.props.loading ?
                                        <>
                                                <div class="resultContainer__info">
                                                        <h1 class="game-result">{this.props.resultMsg} </h1>
                                                        <div class="button-container">
                                                                <button onClick={this.props.handleButton} href="#" class="newGame-button"> Play Again</button>
                                                        </div>
                                                </div>
                                                <div class="resultContainer__computer">
                                                        {
                                                                this.props.computerSelection
                                                        }
                                                        <p class="info-game">The house picked</p>
                                                </div>
                                        </>
                                        :
                                        <>
                                                <div class="resultContainer__info">
                                                        <h1 class="game-result"> </h1>
                                                </div>
                                                <div class="resultContainer__computer">
                                                        <div class="imageBorder__Empty"  >
                                                        </div>
                                                        <p class="info-game">The house picked</p>
                                                </div>
                                        </>
                                }
                        </div>


                )
        }
}


export default ResultContainer