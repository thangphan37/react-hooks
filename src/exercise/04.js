// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import React from 'react'
import {useLocalStorageState} from '../utils'

function Board({squares, onClick}) {
  // 🐨 squares is the state for this component. Add useState for squares
  // const [squares, setSquares] = useLocalStorageState('squares', Array(9).fill(null))
  // 🐨 We'll need the following bits of derived state:
  // - nextValue ('X' or 'O')
  // - winner ('X', 'O', or null)
  // - status (`Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`)
  // 💰 I've written the calculations for you! So you can use my utilities
  // below to create these variables
  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `4`.
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  //B1: 2 state: history, currentStep
  const [historySquares, setHistorySquares] = useLocalStorageState('history-squares', [Array(9).fill(null)])
  const [currentStep, setCurrentStep] = useLocalStorageState('step', 0)
  const currentSquares = historySquares[currentStep]
  const winner = calculateWinner(currentSquares)
  const nextValue = calculateNextValue(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)

  function selectSquare(square) {
    if(currentSquares[square] || winner) {
      return
    }

    const newHistorySquares = [...historySquares.slice(0, currentStep + 1)]
    const squaresCopy = [...newHistorySquares[currentStep]]
    squaresCopy[square] = nextValue
    
    const historySquaresCopy = [...newHistorySquares, squaresCopy]
    setCurrentStep(c => c+1)
    setHistorySquares(historySquaresCopy)
  }

  function restart() {
    setHistorySquares([Array(9).fill(null)])
    setCurrentStep(0)
  }

  const moves = historySquares.map((squares, index) => {
    const disabled = index === currentStep
    const current = disabled ? '(current)' : ''
    const move = index === 0 ? 'Go to game start' : `Go to move #${index}`

    return (
    <li><button onClick={() => setCurrentStep(index)} disabled={disabled}>{move} {current}</button></li>
    )
  }
  )

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} onClick={selectSquare}/>
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
