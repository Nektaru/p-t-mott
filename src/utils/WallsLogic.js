export const placeWall = (row, col, walls, setWalls, isRobotAtPosition, robotPosition, isValidCoordinate) => {
    if (isValidCoordinate(row, col) && !walls.has(`${row},${col}`) && !isRobotAtPosition(row, col)) {
      setWalls(new Set(walls.add(`${row},${col}`)));
    }
  };