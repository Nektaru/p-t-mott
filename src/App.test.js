
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ToyRobot from './ToyRobot';


describe('ToyRobot', () => {
  test('renders without crashing', () => {
    render(<ToyRobot />);
  });

  test('places the robot correctly on button click', () => {
    render(<ToyRobot />);
    fireEvent.click(screen.getByText('Place Robot'));
  });

  test('moves the robot correctly on button click', () => {
    render(<ToyRobot />);
    fireEvent.click(screen.getByText('Move'));
  });

  test('places random wall correctly on button click', () => {
    render(<ToyRobot />);
    fireEvent.click(screen.getByText('Place Random Wall'));
  });


    describe('ToyRobot', () => {
      test('verifies input fields for PLACE_ROBOT and PLACE_WALL', () => {
        render(<ToyRobot />);
        
        // Simula la entrada de texto para PLACE_ROBOT con valores correctos
        fireEvent.change(screen.getByLabelText(/Comando:/), { target: { value: 'PLACE_ROBOT 1,2,NORTH' } });
    
        // Verifica que el valor del input sea el esperado
        expect(screen.getByLabelText(/Comando:/).value).toBe('PLACE_ROBOT 1,2,NORTH');
    
        // Simula la entrada de texto para PLACE_WALL con valores correctos
        fireEvent.change(screen.getByLabelText(/Comando:/), { target: { value: 'PLACE_WALL 3,4' } });
    
        // Verifica que el valor del input sea el esperado
        expect(screen.getByLabelText(/Comando:/).value).toBe('PLACE_WALL 3,4');
      });
      
}); 



}); 
