import React, { useState } from 'react';
import './App.css';

const ToyRobot = () => {
  const [robotPosition, setRobotPosition] = useState(null);
  const [robotFacing, setRobotFacing] = useState(null);
  const [walls, setWalls] = useState(new Set());
  const [inputCommand, setInputCommand] = useState('');
  const [reportText, setReportText] = useState('');

  const boardSize = 5;

  const processPlaceCommand = (command) => {
      const matchRobot = command.match(/^PLACE_ROBOT (\d+),(\d+),(NORTH|SOUTH|EAST|WEST)$/);
  
      if (matchRobot) {
        const [, row, col, facing] = matchRobot;
        placeRobot(parseInt(row), parseInt(col), facing);
      }
  
      const matchWall = command.match(/^PLACE_WALL (\d+),(\d+)$/);
  
      if (matchWall) {
        const [, row, col] = matchWall;
        placeWall(parseInt(row), parseInt(col));
      }
    };

    
const placeRobot = (row, col, facing) => {
  if (isValidCoordinate(row, col) && !walls.has(`${row},${col}`) && ['NORTH', 'SOUTH', 'EAST', 'WEST'].includes(facing)) {
    setRobotPosition({ row, col });
    setRobotFacing(facing);
  }
};




const placeWall = (row, col) => {
  if (isValidCoordinate(row, col) && !walls.has(`${row},${col}`) && !isRobotAtPosition(row, col)) {
    setWalls(new Set(walls.add(`${row},${col}`)));
  }
};


const isValidCoordinate = (row, col) => row >= 1 && row <= boardSize && col >= 1 && col <= boardSize;


const isRobotAtPosition = (row, col) => robotPosition && robotPosition.row === row && robotPosition.col === col;


const moveRobot = () => {
  if (robotPosition && robotFacing) {
    let { row, col } = robotPosition;

    switch (robotFacing) {
      case 'WEST':
        if (col - 1 >= 1 && !walls.has(`${row},${col - 1}`)) {
          col -= 1;
        } else if (col - 1 < 1 && !walls.has(`${row},${boardSize}`)) {
          col = boardSize;
        }
        break;
      case 'NORTH':
        if (row + 1 <= boardSize && !walls.has(`${row + 1},${col}`)) {
          row += 1;
        } else if (row + 1 > boardSize && !walls.has(`1,${col}`)) {
          row = 1;
        }
        break;
      case 'EAST':
        if (col + 1 <= boardSize && !walls.has(`${row},${col + 1}`)) {
          col += 1;
        } else if (col + 1 > boardSize && !walls.has(`${row},1`)) {
          col = 1;
        }
        break;
      case 'SOUTH':
        if (row - 1 >= 1 && !walls.has(`${row - 1},${col}`)) {
          row -= 1;
        } else if (row - 1 < 1 && !walls.has(`${boardSize},${col}`)) {
          row = boardSize;
        }
        break;
      default:
        break;
    }

    setRobotPosition({ row, col });
  }
};


const turnRobot = (direction) => {
  if (robotFacing) {
    const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    const currentIdx = directions.indexOf(robotFacing);

    if (direction === 'LEFT') {
      const degrees = 90;
      const newIdx = (currentIdx - degrees / 90 + 4) % 4;
      setRobotFacing(directions[newIdx]);
    } 
    else if (direction === 'RIGHT') {
      const degrees = 90;
      const newIdx = (currentIdx + degrees / 90) % 4;
      setRobotFacing(directions[newIdx]);
    }
  }
};


const handleExecuteCommand = () => {

  if (inputCommand.startsWith('PLACE_ROBOT') || inputCommand.startsWith('PLACE_WALL')) {
      processPlaceCommand(inputCommand);
    } else {
      console.log(`Executing command: ${inputCommand}`);
    }
};


const handleInputChange = (event) => {
    setInputCommand(event.target.value);
  };

  
const report = () => {
    if (robotPosition) {
      const reportMessage = `${robotPosition.row},${robotPosition.col},${robotFacing}`;
      setReportText(reportMessage);
      console.log(reportMessage);
    }
  };


const getRandomCoordinate = () => Math.floor(Math.random() * boardSize) + 1;


const handleRandomWall = () => {
    let randomRow, randomCol;
      do {
      randomRow = getRandomCoordinate();
      randomCol = getRandomCoordinate();
    } while (walls.has(`${randomRow},${randomCol}`) || isRobotAtPosition(randomRow, randomCol));
  
    placeWall(randomRow, randomCol);
  };


const clearBoard = () => {
    setRobotPosition(null);
    setRobotFacing(null);
    setWalls(new Set());
    setReportText('');
  };

  

return (
  <div>
    <div className="board">
      {Array.from({ length: boardSize }, (_, row) => (
        <div key={row} className="row">
          {Array.from({ length: boardSize }, (_, col) => (
            <div
              key={col}
              className={`cell ${isRobotAtPosition(row + 1, col + 1) ? 'robot' : ''} ${
                walls.has(`${row + 1},${col + 1}`) ? 'wall' : ''
              }`}
            ></div>
          ))}
        </div>
      ))}
    </div>
    <div className='comands'>
      <label>
        Comando : 
        <input type="text" value={inputCommand} onChange={handleInputChange} />
      </label>
      <button onClick={handleExecuteCommand}>Ejecutar</button>
    </div>
    <div className='buttons'>
      <button onClick={() => placeRobot(1, 1, 'NORTH')}>Place Initial Robot</button>
      <button onClick={handleRandomWall}>Place Random Wall</button>
      <button onClick={moveRobot}>Move</button>
      <button onClick={() => turnRobot('LEFT')}>Left</button>
      <button onClick={() => turnRobot('RIGHT')}>Right</button>
      <button onClick={report}>Report</button>
      <button onClick={clearBoard}>Clear Board</button>
    </div>
    {reportText && (
      <div className='report'>
        <h3>Report:</h3>
        <p className='report-text'>{reportText}</p>
      </div>
    )}
    <div className='instrucciones'>
        <h2>Instrucciones:</h2> 
            <p>El comando PLACE_ROBOT debe incluir (PLACE_ROBOT + Coordenada 1ª, coordenada 2ª, coordenada de dirección ('NORTH', 'SOUTH', 'EAST', 'WEST))</p>
            <p>El comando PLACE_WALL debe incluir (PLACE_WALL + Coordenada 1ª, coordenada 2ª)</p>
            <p>Place initial robot colocará el robot en la posición 1,1 con dirección NORTH</p>
            <p>Move desplazará el robot una posición en la dirección en la que esté mirando ('NORTH', 'SOUTH', 'EAST', 'WEST)</p>
            <p>Left girará 90º a la izquierda la dirección actual del robot </p>
            <p>Right girará 90º a la derecha la dirección actual del robot </p>
            <p>Place random wall colocará una wall en una posición aleatoria</p>
            <p>Report imprimirá en pantalla las coordenadas actuales del Robot</p>
            <p>Clear board eliminará todas las walls y el robot de la pantalla</p>
    </div>
  </div>
);
};

export default ToyRobot;