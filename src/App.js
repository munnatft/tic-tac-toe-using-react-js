import { useEffect, useState } from 'react';
import styles from './App.module.css';
import Board from './components/Board';

const WIN_CONDITIONS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

const App = () => {
  const [board,setBoard] = useState(Array(9).fill(null));
  const [turnForX , setTurnForX] = useState(false);
  const [result,setResult] = useState({winner : "", status:""})
  const [gameOver,setGameOver] = useState(false);

  useEffect(()=>{
    setTurnForX(!turnForX)
    const winner = checkWinner(board);
    if(winner) {
      if (winner === "X") {
        setResult({winner:"Player X", status : "won"})
      } else {
        setResult({winner:"Player O", status : "won"})
      }
      setGameOver(true)
    } else {
      checkIfTie(board)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[board])

  useEffect(() => {
    if(gameOver) {
      setTimeout(()=> resetGame(),5000)
    }
  },[gameOver])

  const handleUpdateBoard = (boxIndex) => {
    const updatedBoard = board.map((value,index)=> {
      if(index === boxIndex && value === null) {
        return turnForX === true ? "X" : "O";
      } else {
        return value;
      }
    })
    setBoard(updatedBoard)
  }

  const checkWinner = (board) => {
    let winner;
    WIN_CONDITIONS.forEach((win) => {
      const [i,j,k] = win;
      if(board[i] && board[i]===board[j] && board[j]===board[k]) {
        winner =  board[i];
      } 
    })
    return winner;
  }

  const checkIfTie = (board) => {
    let allBoxesFilled = true;
    board.forEach((val) => {
      if(val===null) {
        allBoxesFilled = false;
      }
    })
    if(allBoxesFilled) {
      setResult({winner:"No one", status : "draw"})
      setGameOver(true)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurnForX(false)
    setResult({winner : "", status:""})
    setGameOver(false)
  }

  return (
    <div className={styles.game}>
      <h1 className={styles.game_heading}>Tic Tac Toe Game</h1>
      <div className={styles.players_box}>
          <span className={turnForX ? styles.active : ""}>Player X</span>
          <span className={!turnForX ? styles.active : ""}>Player O</span>
      </div>
      <Board board={board} updateBoard={handleUpdateBoard} gameOver={gameOver} />
      <div className={styles.result}>{result.status === "draw" ? "The match is drawn." : result.status !== "" && result.winner !=="" && `${result.winner} won the match.`}</div>
      <div className={styles.reset} onClick={resetGame} >Reset Game</div>
    </div>
  )
}

export default App;

