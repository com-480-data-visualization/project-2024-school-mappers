import React, { forwardRef } from "react";

const CompareData = forwardRef(({ countries, variable }, ref) => {
  const variableDataPerCountry = countries.map((country) => country[variable]);

  return (
    <div ref={ref} className="big-card">
      <h2>Variable: {variable}</h2>
      {variableDataPerCountry.map((data) => (
        <div className="card">
          <p>{data}</p>
        </div>
      ))}
    </div>
  );
});

export default CompareData;
