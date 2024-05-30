import React, { forwardRef } from "react";
import IncomeBarChart from "../graphs/IncomeBarChart";
import PisaStackedBarChart from "../graphs/PisaStackedBarChart";

const DetailedCountryInfo = forwardRef(({ country, onSelectSchool }, ref) => {
  if (!country) return null;

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

  const schools = [
    {
      name: "School A",
      city: "City A",
      country: "Switzerland",
      value: 100,
      year: 2023,
      description: "A school description",
      source: "A school source",
      pictures: [
        { type: "Cafeteria", url: "./school.jpg" },
        { type: "Classroom", url: "./school.jpg" },
        { type: "Library", url: "./school.jpg" },
        { type: "Playground", url: "./school.jpg" },
        { type: "Sports Field", url: "./school.jpg" },
        { type: "Swimming Pool", url: "./school.jpg" },
        { type: "Sattelite View", url: "./school.jpg" },
        { type: "School Building", url: "./school.jpg" },
      ],
    },
    {
      name: "School B",
      city: "City B",
      country: "Japan",
      value: 200,
      year: 2023,
      description: "A school description",
      source: "A school source",
      pictures: [
        { type: "Cafeteria", url: "./school.jpg" },
        { type: "Classroom", url: "./school.jpg" },
        { type: "Library", url: "./school.jpg" },
        { type: "Playground", url: "./school.jpg" },
        { type: "Sports Field", url: "./school.jpg" },
        { type: "Swimming Pool", url: "./school.jpg" },
        { type: "Sattelite View", url: "./school.jpg" },
        { type: "School Building", url: "./school.jpg" },
      ],
    },
  ];

  const transformedIncomeData = Object.keys(income).map((key) => ({
    group: key.trim(),
    value: parseFloat(income[key].value),
  }));

  const transformedPisaRepartitionData = Object.keys(pisaRepartition).map(
    (key) => ({
      level: key,
      value: parseFloat(pisaRepartition[key].value),
      year: pisaRepartition[key].year,
      description: pisaRepartition[key].description,
      source: pisaRepartition[key].source,
    })
  );
  return (
    <div ref={ref} className="card detailed-country-info">
      <h2>Details of {name}</h2>
      <div className="card-content">
        <div className="info-column">
          <div>
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
              <strong>Literacy Rate:</strong>{" "}
              {literacyRate?.value?.toLocaleString()}%
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

          <div className="card">
            <IncomeBarChart
              data={transformedIncomeData}
              title="Income Distribution by Population Group"
              subtitle="Source: World Bank (2023)"
            />
          </div>

          <div className="card">
            <PisaStackedBarChart
              data={transformedPisaRepartitionData}
              title="PISA Math Score Repartition by Level"
              subtitle="Source: OECD Programme for International Student Assessment (PISA)"
            />
          </div>
        </div>

        <div className="card schools-column">
          <h3>Schools</h3>
          <ul className="card">
            {schools.map((school) => (
              <li
                className="school-entry"
                onClick={() => onSelectSchool(school)}
              >
                {school.name} in {school.city}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});

export default DetailedCountryInfo;
