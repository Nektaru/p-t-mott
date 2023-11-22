export const placeRobot = (row, col, facing, setRobotPosition, setRobotFacing, isValidCoordinate) => {
    if (isValidCoordinate(row, col) && ['NORTH', 'SOUTH', 'EAST', 'WEST'].includes(facing)) {
      setRobotPosition({ row, col });
      setRobotFacing(facing);
    }
  };
  
  export const turnRobot = (robotFacing, setRobotFacing) => {
    if (robotFacing) {
      const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
      const currentIdx = directions.indexOf(robotFacing);
  
      setRobotFacing(directions[(currentIdx + 1) % 4]);
    }
  };
  