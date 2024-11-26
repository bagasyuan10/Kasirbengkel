import React from "react";

const Summary = ({ totalCost }) => {
  return (
    <div className="summary">
      <h2>Total Biaya</h2>
      <p>$ {totalCost.toLocaleString()} (Tax not included)</p>
    </div>
  );
};

export default Summary;