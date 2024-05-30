import React from "react";
import CountryCard from "./CountryCard";

const CountryCards = ({ countries, onSelectCountry }) => {
  return (
    <div className="country-cards">
      {countries.map((country) => (
        <CountryCard
          country={country}
          onClick={() => onSelectCountry(country.name)}
        />
      ))}
    </div>
  );
};

export default CountryCards;
