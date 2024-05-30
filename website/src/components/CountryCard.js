import React from "react";

function InfoRow({title, info}){
  let description;
  let value;
  if(info){
    description = info.description;
    value = info.valueFormatted;
  }else{
    description = ""
    value = "NA"
  }

  return <p title={description}>
    <strong>{title}:</strong> {value}
  </p>
}

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
      <InfoRow title="Population" info={population} />
      <InfoRow title="GDP/Capita" info={gdpCapita?.Total} />
      <InfoRow title="PISA Score" info={pisaScore?.Total} />
      <InfoRow title="Literacy Rate" info={literacyRate?.Total} />
      <InfoRow title="HDI Rank" info={hdiRank} />
      <InfoRow title="HDI" info={hdi} />
      <InfoRow title="Gini index" info={gini} />
    </div>
  );
};

export default CountryCard;
