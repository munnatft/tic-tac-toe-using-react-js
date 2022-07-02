import React from 'react';
import styles from './Board.module.css';
import Box from './Box';

const Board = ({board,updateBoard}) => {
  return (
    <div className={styles.board}>
      {
        board.map((value,index) => {
            return <Box key={index} value={value} onBoxClick={() => value===null && updateBoard(index)} />
        })
      }
    </div>
  )
}

export default Board;
