import React from 'react';
import Wall from './Walls';
import Robot from './Robot';
import { isRobotAtPosition } from '../ToyRobot.js';
import './Board.css';

const Board = ({ boardSize, robotPosition, walls }) => {
  return (
    <div className="board">
      {Array.from({ length: boardSize }, (_, row) => (
        <div key={row} className="row">
          {Array.from({ length: boardSize }, (_, col) => {
            const adjustedRow = boardSize - row;
            const adjustedCol = col + 1;
            return (
              <div
                key={col}
                className={`cell ${isRobotAtPosition(adjustedRow, adjustedCol) ? 'robot' : ''} ${
                  walls.has(`${adjustedRow},${adjustedCol}`) ? 'wall' : ''
                }`}
              >
                {isRobotAtPosition(adjustedRow, adjustedCol) ? <Robot /> : null}
                {walls.has(`${adjustedRow},${adjustedCol}`) ? <Wall /> : null}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
