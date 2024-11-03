import { useState } from "react";
import Square from "./Square";

const Board = () => {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const handleClick = (i) => {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        }
        else {
            nextSquares[i] = "O";
        }

        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    const calculateWinner = (squares) => {
        const winCondition = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for(let i = 0; i < winCondition.length; i++){
            const [a,b,c] = winCondition[i];
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
            {
                return squares[a];
            }
            
        }
        return null;
    }

    const winner = calculateWinner(squares);
    let status;
    const updateStatus = ()=>{
        if(winner){
            status = `Winner: ${winner}` ;
        }
        else{
            status = `Next Player: ${xIsNext ? "X" : "O"}`;
        }
    }
    updateStatus();

    const handleReset = ()=>{
        setXIsNext(true);
        setSquares(Array(9).fill(null));
    }

    
    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
            <button className="reset" onClick={handleReset}>New Game</button>
        </>
    )
}
export default Board;