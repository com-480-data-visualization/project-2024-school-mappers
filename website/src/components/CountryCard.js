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
      <p title={population?.description}>
        <strong>Population:</strong> {population?.valueFormatted}
      </p>
      <p title={gdpCapita?.Total?.description}>
        <strong>GDP/Capita:</strong> $
        {gdpCapita?.Total?.valueFormatted}
      </p>
      <p title={pisaScore?.Total?.description}>
        <strong>PISA Score:</strong> {pisaScore?.Total?.valueFormatted}
      </p>
      <p title={literacyRate?.description}>
        <strong>Literacy Rate:</strong> {literacyRate?.Total?.valueFormatted}
      </p>
      <p title={hdiRank?.description}>
        <strong>HDI Rank:</strong> {hdiRank?.valueFormatted}
      </p>
      <p title={hdi?.description}>
        <strong>HDI:</strong> {hdi?.valueFormatted}
      </p>
      <p title={gini?.description}>
        <strong>Gini index:</strong> {gini?.valueFormatted}
      </p>
    </div>
  );
};

export default CountryCard;
