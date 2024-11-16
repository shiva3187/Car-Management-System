import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar"; // Import the Navbar component
import "./Home.css";

const HomePage = () => {
  // Dummy car data
  const cars = [
    {
      id: 1,
      name: "Car Model A",
      model: "Sedan",
      price: 25000,
      images: [
        "https://via.placeholder.com/300x300?text=Car1+Image1",
        "https://via.placeholder.com/300x300?text=Car1+Image2",
        "https://via.placeholder.com/300x300?text=Car1+Image3",
      ],
    },
    {
      id: 2,
      name: "Car Model B",
      model: "SUV",
      price: 35000,
      images: [
        "https://via.placeholder.com/300x300?text=Car2+Image1",
        "https://via.placeholder.com/300x300?text=Car2+Image2",
        "https://via.placeholder.com/300x300?text=Car2+Image3",
      ],
    },
    {
      id: 3,
      name: "Car Model C",
      model: "Coupe",
      price: 45000,
      images: [
        "https://via.placeholder.com/300x300?text=Car3+Image1",
        "https://via.placeholder.com/300x300?text=Car3+Image2",
        "https://via.placeholder.com/300x300?text=Car3+Image3",
      ],
    },
    // ... other cars
  ];

  return (
    <div className="home-container">
      <Navbar /> {/* Add the Navbar component here */}
     

      <div className="car-cards-container">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div key={car.id} className="car-card">
              <ImageSlider images={car.images} />
              <div className="car-info">
                <h2>{car.name}</h2>
                <p>Model: {car.model}</p>
                <p>Price: ${car.price}</p>
                <Link to={`/car/${car.id}`} className="view-details-button">
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No cars available. Add some cars to get started.</p>
        )}
      </div>
    </div>
  );
};

const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0); // Loop back to the first image
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(images.length - 1); // Loop to the last image
    }
  };

  return (
    <div className="slider-container">
      <button className="slider-arrow left-arrow" onClick={prevImage}>
        &#60;
      </button>
      <div className="card-image-container">
        <img
          src={images[currentImageIndex]}
          alt="Car"
          className="card-image"
        />
      </div>
      <button className="slider-arrow right-arrow" onClick={nextImage}>
        &#62;
      </button>
    </div>
  );
};

export default HomePage;
