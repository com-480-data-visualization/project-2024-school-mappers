import React from "react";

const CountryCard = ({ country, onClick }) => {
  const {
    name,
    "PISA score": pisaScore,
    "PISA repartition": pisaRepartition,
    "GDP/Capita": gdpCapita,
    "Litteracy rate": literacyRate,
    Population: population,
    "HDI Rank": hdiRank,
    HDI: hdi,
    Income: income,
    Gini: gini,
    Enrolment: enrolment,
    "Private School Enrolment": privateSchoolEnrolment,
    "School life expectancy": schoolLifeExpectancy,
    "Gov. Expenditure on education": govExpenditure,
    Dropout: dropout,
  } = country;

  return (
    <div className="country-card" onClick={onClick}>
      <h2>{name}</h2>
      <p>
        <strong>Population:</strong> {population?.value?.toLocaleString()}
      </p>
      <p>
        <strong>GDP/Capita:</strong> $
        {gdpCapita?.Total?.value?.toLocaleString()}
      </p>
      <p>
        <strong>PISA Score:</strong> {pisaScore?.Total?.value}
      </p>
      <p>
        <strong>Literacy Rate:</strong> {literacyRate?.value?.toLocaleString()}%
      </p>
      <p>
        <strong>HDI Rank:</strong> {hdiRank?.value}
      </p>
      <p>
        <strong>HDI:</strong> {hdi?.value}
      </p>
      <p>
        <strong>Gini:</strong> {gini?.value}
      </p>
    </div>
  );
};

export default CountryCard;
