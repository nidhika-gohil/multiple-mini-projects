import useTicTacToe from "./customHook/useTicTacToe";
import "./ticTacToe.css"

const TicTacToe = ({boardDimension}) => {
  const {board, handleClick, getStatusMsg, resetGame} = useTicTacToe();
  return (
    <div className="game">
      <div className="status">
        {getStatusMsg()}
        <button className="resetButton" onClick={resetGame}>Reset Game</button>
      </div>
      <div className="board">
        {
          board.map((b, index)=> {
            return <button className="cell" key={index} onClick={() => {handleClick(index)}} disabled={b!==null}>{b}</button>
          })
        }
      </div>
    </div>
  )
};

export default TicTacToe;