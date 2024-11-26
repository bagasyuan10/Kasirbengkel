import React, { useState } from "react";

const App = () => {
  const partNames = [
    "Axle",
    "Body",
    "Brake",
    "Clutch",
    "Radiator",
    "Electronic",
    "Engine",
    "Injector",
    "Tire",
    "Transmission",
  ];

  // Inisialisasi parts untuk setiap kelas
  const initialParts = partNames.map((name) => ({ name, quantity: "" }));

  // Menyimpan state untuk setiap kelas (S, A, B, C, M)
  const [classes, setClasses] = useState({
    S: { parts: [...initialParts], priceOption: "Normal" },
    A: { parts: [...initialParts], priceOption: "Normal" },
    B: { parts: [...initialParts], priceOption: "Normal" },
    C: { parts: [...initialParts], priceOption: "Normal" },
    M: { parts: [...initialParts], priceOption: "Normal" },
  });

  const [activeClass, setActiveClass] = useState(null); // Kelas yang sedang dipilih

  // Fungsi untuk menangani perubahan jumlah part
  const handlePartChange = (className, partIndex, quantity) => {
    if (quantity > 6) return; // Membatasi input tidak lebih dari 6
    setClasses((prevClasses) => ({
      ...prevClasses,
      [className]: {
        ...prevClasses[className],
        parts: prevClasses[className].parts.map((part, index) =>
          index === partIndex ? { ...part, quantity } : part
        ),
      },
    }));
  };

  // Menghitung total biaya
  const calculateTotalCost = () => {
    return Object.keys(classes).reduce((total, className) => {
      const pricePerPart = classes[className].priceOption === "Normal" ? 135 : 120;
      const classTotal = classes[className].parts.reduce(
        (subTotal, part) => subTotal + (parseInt(part.quantity, 10) || 0) * pricePerPart,
        0
      );
      return total + classTotal;
    }, 0);
  };

  // Menghitung total part yang dibeli
  const calculateTotalParts = () => {
    return Object.keys(classes).reduce((total, className) => {
      const classTotalParts = classes[className].parts.reduce(
        (subTotal, part) => subTotal + (parseInt(part.quantity, 10) || 0),
        0
      );
      return total + classTotalParts;
    }, 0);
  };

  // Menangani pemilihan kelas
  const handleClassSelect = (className) => {
    setActiveClass(className);
  };

  // Menangani pemilihan harga per kelas
  const handlePriceSelect = (className, option) => {
    setClasses((prevClasses) => ({
      ...prevClasses,
      [className]: {
        ...prevClasses[className],
        priceOption: option, // Menentukan tipe harga per kelas
      },
    }));
  };

  // Menangani reset kembali ke pilihan awal
  const handleReset = () => {
    setActiveClass(null); // Kembali ke pilihan kelas
    setClasses({
      S: { parts: [...initialParts], priceOption: "Normal" },
      A: { parts: [...initialParts], priceOption: "Normal" },
      B: { parts: [...initialParts], priceOption: "Normal" },
      C: { parts: [...initialParts], priceOption: "Normal" },
      M: { parts: [...initialParts], priceOption: "Normal" },
    });
  };

  // Komponen untuk menampilkan parts sesuai kelas
  const PartSelector = ({ className, parts, onPartChange }) => {
    const pricePerPart = classes[className].priceOption === "Normal" ? 135 : 120;

    return (
      <div className="part-selector">
        <h2>
          Kelas {className} - {classes[className].priceOption} (Harga per part: {pricePerPart})
        </h2>
        {parts.map((part, index) => (
          <div key={index} className="part-item">
            <label>
              {part.name}:
              <input
                type="number"
                value={part.quantity}
                min="0"
                max="6"
                onChange={(e) =>
                  onPartChange(className, index, e.target.value === "" ? "" : parseInt(e.target.value, 10))
                }
              />
            </label>
          </div>
        ))}
      </div>
    );
  };

  // Komponen untuk menampilkan total biaya dan total part yang dibeli
  const Summary = ({ totalCost }) => {
    return (
      <div className="summary">
        <h2>Total Biaya</h2>
        <p>Rp {totalCost.toLocaleString()} (Belum termasuk pajak)</p>
      </div>
    );
  };

  return (
    <div className={`app ${activeClass ? "class-selected" : ""}`}>
      <h1>Sistem Kasir Bengkel</h1>

      {/* Pilihan Kelas */}
      {activeClass === null && (
        <div className="class-selection">
          <h2>Pilih Kelas</h2>
          <div className="class-buttons">
            {["S", "A", "B", "C", "M"].map((className) => (
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
            parts={classes[activeClass].parts}
            onPartChange={handlePartChange}
          />

          {/* Urutan komponen yang diminta */}
          <div className="summary-container">
            <h3>Total Parts yang Dibeli: {calculateTotalParts()}</h3>

            <div className="price-selection">
              <h3>Pilih Harga</h3>
              <button
                className={`price-button ${classes[activeClass].priceOption === "Normal" ? "active" : ""}`}
                onClick={() => handlePriceSelect(activeClass, "Normal")}
              >
                Normal (135)
              </button>
              <button
                className={`price-button ${classes[activeClass].priceOption === "Kerja Sama" ? "active" : ""}`}
                onClick={() => handlePriceSelect(activeClass, "Kerja Sama")}
              >
                Kerja Sama (120)
              </button>
            </div>

            <Summary totalCost={calculateTotalCost()} />
          </div>

          <button className="back-button" onClick={handleReset}>
            Kembali ke Pilihan Kelas
          </button>
        </div>
      )}
    </div>
  );
};

export default App;