import { useState } from 'react';
import styles from './App.module.css';
import Board from './components/Board';

const WIN_CONDITIONS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

const App = () => {
  const [board,setBoard] = useState(Array(9).fill(null));
  const [turnForX , setTurnForX] = useState(true);


  const handleUpdateBoard = (boxIndex) => {
    const updatedBoard = board.map((value,index)=> {
      if(index === boxIndex && value === null) {
        return turnForX === true ? "X" : "O";
      } else {
        return value;
      }
    })
    checkWinner(updatedBoard)
    setBoard(updatedBoard);
    setTurnForX(!turnForX)
  }

  const checkWinner = (board) => {
    WIN_CONDITIONS.forEach((value) => {
      const [i,j,k] = value;
      if(board[i] && board[i]===board[j] && board[j]===board[k]) {
        console.log("win")
      }
    })
  }

  return (
    <div className={styles.game}>
      <h1 className={styles.game_heading}>Tic Tac Toe Game</h1>
      <div className={styles.players_box}>
          <span>Player 1</span>
          <span>Player 2</span>
      </div>
      <Board board={board} updateBoard={handleUpdateBoard} />
    </div>
  )
}

export default App;

