import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import GameContainer from './components/gameContainer/GameContainer';
import RulesBtn from './components/rulesbtn/RulesBtn';
import ResultContainer from './components/resultContainer/ResultContainer';
import Rock from './components/rock/Rock';
import Scissors from './components/scissors/Scissors';
import Paper from './components/paper/Paper';
import Modal from './components/modal/Modal';

class App extends React.Component {

  state = {
    mySelection: '',
    computerSelection: '',
    resultMsg: '',
    gameOn: true,
    score: 0,
    isModalOpen: false,
    loading: false,
  }


  componentDidMount = () => {
    if (localStorage.getItem('score')) {
      console.log('asdfasdf')
      let scoreLocal = JSON.parse(localStorage.getItem('score'))
      console.log(scoreLocal, 'socreasfsda')
      this.setState({ score: scoreLocal })
      this.setState({loading: true})

    } else {
      localStorage.setItem('score', '0')
    }

  }

  render() {
    return (
      <>
        { this.state.loading ? 
             <Navbar score={this.state.score} />
            :
            <Navbar score={"-"} />


        }

        {this.state.isModalOpen ? <Modal closeModal={this.closeModal} /> : null}
        {
          this.state.gameOn ?
            <GameContainer handleClick={this.handleClick} />
            :
            <ResultContainer
              mySelection={this.renderChoice(this.state.mySelection, this.state.resultMsg, 'mine', this.state.loading)}
              computerSelection={this.renderChoice(this.state.computerSelection, this.state.resultMsg, "computer", this.state.loading)}
              resultMsg={this.state.resultMsg}
              handleButton={this.handleButton}
              setLoading={this.setLoading}
              loading={this.state.loading}
            />
        }

        <RulesBtn openModal={this.openModal} />

      </>
    );
  }


  setLoading = () => {
    console.log('chequeando si anda')
    this.setState({ loading: true })
  }

  openModal = () => {
    console.log("entro", this.state)
    this.setState({ isModalOpen: true })
  }

  closeModal = () => {
    console.log('cerro')
    this.setState({ isModalOpen: false })
  }

  handleClick = async (event) => {
    console.log(event)
    let computer = this.computerChoice()
    console.log(computer, "compu eligion")
    await this.setState({ computerSelection: computer })
    await this.setState({ mySelection: event })

    let message = await this.playGame(this.state.mySelection, this.state.computerSelection)
    this.setScore(message)
    this.setState({ resultMsg: message })
    this.setState({
      gameOn: !this.state.gameOn,
      loading: false,
    })
  }

  handleButton = () => {
    this.setState({
      gameOn: !this.state.gameOn
    })
  }

  renderChoice = (word, txt, turn, loading) => {
    console.log(word, turn,loading )
    let winner = false
    if (turn === "mine" && txt === "You win") {
      winner = true
    } else if (turn === "computer" && txt === "You lose") {
      console.log('entro cuando gana la compu')
      winner = true
    }

    switch (word) {
      case 'rock':
        return <Rock winner={winner} loading={loading} secondRendering={true} />
      case 'paper':
        return <Paper winner={winner} loading={loading} secondRendering={true} />
      case 'scissors':
        return <Scissors winner={winner} loading={loading} secondRendering={true} />
      default:
        break;
    }
  }

  computerChoice = () => {
    const computerChoices = ["rock", "paper", "scissors"];
    const compAnswer = Math.floor(Math.random() * computerChoices.length);
    return computerChoices[compAnswer];
  }

  playGame = (myChoice, computerChoice) => {
    let msg = "game starts...";
    switch (myChoice) {
      case "rock":
        if (computerChoice === "rock") {
          msg = "It's a draw";
        } else if (computerChoice === "paper") {
          msg = "You lose";
        } else {
          msg = "You win";
        }
        return msg;

      case "paper": {
        if (computerChoice === "paper") {
          msg = "It's a draw";
        } else if (computerChoice === "scissors") {
          msg = "You lose";
        } else {
          msg = "You win";
        }
        return msg;
      }

      case "scissors": {
        if (computerChoice === "scissors") {
          msg = "It's a draw";
        } else if (computerChoice === "rock") {
          msg = "You lose";
        } else {
          msg = "You win";
        }
        return msg;
      }
      default: {
        console.log(myChoice, "error")
        break;
      }
    }
  }

  setScore = async (msg) => {
    if (msg === 'You win') {
      await this.setState({ score: this.state.score + 1 })
    } else if (msg === "You lose") {
      await this.setState({ score: this.state.score - 1 })
    }

    await this.saveLocalStorage(this.state.score)

  }

  saveLocalStorage = (score) => {

    localStorage.setItem('score', score)
  }

}

export default App;
