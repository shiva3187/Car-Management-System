import React, { createContext, useContext, useState } from 'react';
import { createCarService, fetchCarsService, searchCarsService, getCarDetailsService, updateCarService, deleteCarService } from '../services/carService';

const CarContext = createContext();

export const useCar = () => useContext(CarContext);

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    const carData = await fetchCarsService();
    setCars(carData);
  };

  const createCar = async (carData) => {
    const newCar = await createCarService(carData);
    setCars((prevCars) => [...prevCars, newCar]);
  };

  const searchCars = async (keyword) => {
    const searchedCars = await searchCarsService(keyword);
    setCars(searchedCars);
  };

  const getCarDetails = async (carId) => {
    const car = await getCarDetailsService(carId);
    return car;
  };

  const updateCar = async (carId, carData) => {
    const updatedCar = await updateCarService(carId, carData);
    setCars((prevCars) => prevCars.map((car) => (car._id === carId ? updatedCar : car)));
  };

  const deleteCar = async (carId) => {
    await deleteCarService(carId);
    setCars((prevCars) => prevCars.filter((car) => car._id !== carId));
  };

  return (
    <CarContext.Provider
      value={{
        cars,
        fetchCars,
        createCar,
        searchCars,
        getCarDetails,
        updateCar,
        deleteCar
      }}
    >
      {children}
    </CarContext.Provider>
  );
};
