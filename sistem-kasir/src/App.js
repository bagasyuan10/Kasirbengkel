import React, { useState } from "react";
import PartSelector from "./components/PartSelector";
import Summary from "./components/Summary";

const App = () => {
  const partNames = [
    "Radiator",
    "Engine",
    "Body",
    "Electronics",
    "Transmission",
    "Clutch",
    "Injector",
    "Brakes",
    "Tire",
    "Axle",
  ];

  const initialParts = partNames.map((name) => ({ name, quantity: 0 }));

  const [classes, setClasses] = useState({
    S: [...initialParts],
    A: [...initialParts],
    B: [...initialParts],
    M: [...initialParts],
  });

  const [activeClass, setActiveClass] = useState(null);

  const handlePartChange = (className, partIndex, quantity) => {
    if (quantity > 6) return; // Membatasi input tidak lebih dari 6
    setClasses((prevClasses) => ({
      ...prevClasses,
      [className]: prevClasses[className].map((part, index) =>
        index === partIndex ? { ...part, quantity } : part
      ),
    }));
  };

  const calculateTotalCost = () => {
    const pricePerPart = 135;
    return Object.values(classes).reduce((total, parts) => {
      return (
        total +
        parts.reduce((subTotal, part) => subTotal + part.quantity * pricePerPart, 0)
      );
    }, 0);
  };

  const handleClassSelect = (className) => {
    setActiveClass(className);
  };

  const handleReset = () => {
    setActiveClass(null); // Kembali ke pilihan kelas
    setClasses({
      S: [...initialParts],
      A: [...initialParts],
      B: [...initialParts],
      M: [...initialParts],
    });
  };

  return (
    <div className="app">
      <h1>Sistem Kasir Bengkel</h1>
      
      {/* Pilihan Kelas */}
      {activeClass === null && (
        <div className="class-selection">
          <h2>Pilih Kelas</h2>
          <div className="class-buttons">
            {["S", "A", "B", "M"].map((className) => (
              <button
                key={className}
                className="class-button"
                onClick={() => handleClassSelect(className)}
              >
                Kelas {className}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tampilan berdasarkan kelas yang dipilih */}
      {activeClass && (
        <div className="class-container">
          <PartSelector
            className={activeClass}
            parts={classes[activeClass]}
            onPartChange={handlePartChange}
          />
          <Summary totalCost={calculateTotalCost()} />
          <button className="back-button" onClick={handleReset}>
            Kembali ke Pilihan Kelas
          </button>
        </div>
      )}
    </div>
  );
};

export default App;