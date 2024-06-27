import { useState } from "react";

const initialBoard = () => Array(9).fill(null);
const useTicTacToe = () => {
  const [board, setBoard] = useState(initialBoard());
  const [isXTurn, setIsXTurn] = useState(true);
  
  const WINNER_PATTERN = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  const calculateWinner = () =>{
    for(let i=0; i< WINNER_PATTERN.length; i++){
      const [a, b, c] = WINNER_PATTERN[i];
      if(board[a] && board[a] === board[b] && board[a] === board[c]){
        return board[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    const winner = calculateWinner();
    if(winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" :"O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  const getStatusMsg = () => {
    const winner = calculateWinner();
    if(winner) return `Player ${winner} wins!`;
    if(!board.includes(null)) return "Its a Draw !!!";
    return `Player ${isXTurn ? "X" : "O"} turn`;
  };

  const resetGame = () => {
    setBoard(initialBoard());
  };

  return {board, handleClick, getStatusMsg, resetGame};
};

export default useTicTacToe;