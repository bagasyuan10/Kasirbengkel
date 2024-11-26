import React from "react";

const PartSelector = ({ className, parts, onPartChange }) => {
  return (
    <div className="part-selector">
      <h2>Kelas {className}</h2>
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
                onPartChange(className, index, parseInt(e.target.value, 10) || 0)
              }
            />
          </label>
        </div>
      ))}
    </div>
  );
};

export default PartSelector;