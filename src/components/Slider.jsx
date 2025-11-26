// src/components/Slider.js
import React, { useState, useEffect } from "react";

const images = [
  "https://via.placeholder.com/800x300?text=Image+1",
  "https://via.placeholder.com/800x300?text=Image+2",
  "https://via.placeholder.com/800x300?text=Image+3",
  "https://via.placeholder.com/800x300?text=Image+4",
  "https://via.placeholder.com/800x300?text=Image+5"
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Автоматичне перемикання кожні 12 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: "800px",
        height: "300px",
        margin: "20px auto",
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <img
        src={images[currentIndex]}
        alt="slide"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export default Slider;
