import React from 'react';
import Wall from './Walls';
import Robot from './Robot';

const Board = ({ boardSize, robotPosition, walls }) => {
  return (
    <div className="board">
      {Array.from({ length: boardSize }, (_, row) => (
        <div key={row} className="row">
          {Array.from({ length: boardSize }, (_, col) => (
            <div
              key={col}
              className={`cell ${robotPosition && robotPosition.row === row + 1 && robotPosition.col === col + 1 ? 'robot' : ''} ${
                walls.has(`${row + 1},${col + 1}`) ? 'wall' : ''
              }`}
            >
              {robotPosition && robotPosition.row === row + 1 && robotPosition.col === col + 1 ? <Robot /> : null}
              {walls.has(`${row + 1},${col + 1}`) ? <Wall /> : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;