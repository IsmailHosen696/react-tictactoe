import { useEffect, useState } from "react";

function App() {
  let [cells, setCells] = useState<string[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]);
  const [currentPlayer, setCurrentPlayer] = useState<string>("");
  const [winner, setWinner] = useState<boolean>(false);
  const [winnerName, setWinnerName] = useState<string>("")

  let players: string[] = ["x", "o"];

  const selectPlayer = () => {
    let turn = Math.random();
    if (turn < 0.5) {
      setCurrentPlayer(players[0])
    } else {
      setCurrentPlayer(players[1])
    }
  }

  const restartGame = () => {
    setCells([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]);
    setWinnerName("");
    setWinner(false);
  }

  useEffect(() => {
    selectPlayer()
  }, [])

  function declareWinner(pos: string[]) {
    setWinner(true);
    if (cells[parseInt(pos[0])][parseInt(pos[1])] === 'x') {
      setWinnerName('x win the game');
    } else {
      setWinnerName('o win the game');
    }
  }

  const checkWinner = (pos: string[]) => {
    let newCell = cells;
    if (newCell[0][0] === newCell[0][1] && newCell[0][1] === newCell[0][2] && newCell[0][2] !== "") {
      declareWinner(pos);
    }
    else if (newCell[1][0] === newCell[1][1] && newCell[1][1] === newCell[1][2] && newCell[1][2] !== "") {
      declareWinner(pos);
    }
    else if (newCell[2][0] === newCell[2][1] && newCell[2][1] === newCell[2][2] && newCell[2][2] !== "") {
      declareWinner(pos);
    }
    else if (newCell[0][0] === newCell[1][0] && newCell[1][0] === newCell[2][0] && newCell[2][0] !== "") {
      declareWinner(pos);
    }
    else if (newCell[0][1] === newCell[1][1] && newCell[1][1] === newCell[2][1] && newCell[2][1] !== "") {
      declareWinner(pos);
    }
    else if (newCell[0][2] === newCell[1][2] && newCell[1][2] === newCell[2][2] && newCell[2][2] !== "") {
      declareWinner(pos);
    }
    else if (newCell[0][0] === newCell[1][1] && newCell[1][1] === newCell[2][2] && newCell[2][2] !== "") {
      declareWinner(pos);
    }
    else if (newCell[0][2] === newCell[1][1] && newCell[1][1] === newCell[2][0] && newCell[2][0] !== "") {
      declareWinner(pos);
    } else {
      let freeSpace: number = 0;
      for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells.length; j++) {
          if (cells[i][j] === '') {
            freeSpace++
          }
        }
      }
      if (freeSpace <= 1) {
        setWinner(true);
        setWinnerName("the game ties")
      }
      return
    }
  }

  const handleClick = (pos: string) => {
    let posClicked = pos.split("");
    let newCells = cells;

    if (!winner) {
      if (currentPlayer === 'x') {
        if (newCells[parseInt(posClicked[0])][parseInt(posClicked[1])] === '') {
          newCells[parseInt(posClicked[0])][parseInt(posClicked[1])] = 'x';
          setCells(newCells);
          setCurrentPlayer("o")
        }
      } else if (currentPlayer === 'o') {
        if (newCells[parseInt(posClicked[0])][parseInt(posClicked[1])] === '') {
          newCells[parseInt(posClicked[0])][parseInt(posClicked[1])] = 'o'
          setCells(newCells);
          setCurrentPlayer("x")
        }
      }
      checkWinner(posClicked);
    }
  }
  return (
    <div className="display">
      {winner && <p>{winnerName}</p>}
      <div className="game_board">
        {
          cells.map((cell, i) => (
            cell.map((c, j) =>
              <button onClick={(e) => handleClick(e.currentTarget.id)} className="board" id={`${i}${j}`} key={j}>
                {c}
              </button>
            )
          ))
        }
      </div>
      <button className="restart-button" onClick={restartGame}>Restart</button>
    </div>
  );
}

export default App;
