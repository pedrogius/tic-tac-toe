import { useState } from "react";
import "./App.css";
import Square from "./Components/Square";

type valuesObj = {
  [key: string]: number[];
};

const calculateWinner = (values: string[]) => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [0, 3, 6],
    [2, 4, 6],
    [2, 5, 8],
    [1, 4, 7],
  ];

  let winner;

  const { x, o } = values.reduce(
    (acc, curr, idx) => {
      acc[curr]?.push(idx);
      return acc;
    },
    { x: [], o: [] } as valuesObj
  );

  winningCombinations.forEach((combination) => {
    if (combination.every((num) => x.includes(num))) {
      winner = "x";
    } else if (combination.every((num) => o.includes(num))) {
      winner = "o";
    }
  });

  if (values.every((v) => v) && !winner) return "tie";

  return winner;
};

function App() {
  const [currentPlayer, setCurrentPlayer] = useState("x");
  const [values, setValues] = useState(new Array(9).fill(null));

  const handleClick = (idx: number) => {
    if (values[idx]) return;
    const newValues = [...values];
    newValues.splice(idx, 1, currentPlayer);
    setValues(newValues);
    setCurrentPlayer((prevPlayer) => (prevPlayer === "x" ? "o" : "x"));
  };

  const winner = calculateWinner(values);
  return (
    <div className="App">
      <div className="row">
        <Square value={values[0]} onItemClick={() => handleClick(0)} />
        <Square value={values[1]} onItemClick={() => handleClick(1)} />
        <Square value={values[2]} onItemClick={() => handleClick(2)} />
      </div>
      <div className="row">
        <Square value={values[3]} onItemClick={() => handleClick(3)} />
        <Square value={values[4]} onItemClick={() => handleClick(4)} />
        <Square value={values[5]} onItemClick={() => handleClick(5)} />
      </div>
      <div className="row">
        <Square value={values[6]} onItemClick={() => handleClick(6)} />
        <Square value={values[7]} onItemClick={() => handleClick(7)} />
        <Square value={values[8]} onItemClick={() => handleClick(8)} />
      </div>
      <div className="winner">
        <h5>
          {winner && (winner !== "tie" ? `Winner: ${winner}` : "It's a tie")}
        </h5>
        <button onClick={() => setValues(new Array(9).fill(null))}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
