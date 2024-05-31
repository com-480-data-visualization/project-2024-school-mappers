import React, { forwardRef } from "react";
import IncomeBarChart from "../graphs/IncomeBarChart";
import PisaStackedBarChart from "../graphs/PisaStackedBarChart";
import { DetailedCountryLinearGraph } from "../graphs/LinearGraphs";
import * as d3 from 'd3';


const DetailedCountryInfo = forwardRef(({ country, onSelectSchool, onSelectVariable }, ref) => {
  if (!country) return null;

  const {
    id,
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
    "Private school enrolment": privateSchoolEnrolment,
    "School life expectancy": schoolLifeExpectancy,
    "Gov. Expenditure on education": govExpenditure,
    Dropout: dropout,
  } = country;

  const colorMap = d3.scaleOrdinal(d3.schemeAccent);


  const schools = [
    {
      name: "School A",
      city: "City A",
      country: "Switzerland",
      size: 1000,
      tuition: 1000,
      income: 1000000,
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
      size: 789,
      tuition: 0,
      income: 6543,
      value: 200,
      year: 2023,
      description: "A school description",
      source: "A school source",
      pictures: [
        { type: "Cafeteria", url: "${process.env.PUBLIC_URL}/school.jpg" },
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
    <div ref={ref} className="big-card">
      <div className="card-content">
        <div className="info-column">
          <h2>Details of {name}</h2>
          <div className="card">
            <p>Map</p>
            <ul>
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
          <div className="card">
            <p>PISA repartition</p>
          </div>
        </div>

        <div className="card schools-column">
          <DetailedCountryLinearGraph data={country} color="red"/>

          <div>
            <p onClick={() => onSelectVariable('dropout')}><b>Dropout</b></p>
            <p onClick={() => onSelectVariable('enrolment')}><b>Enrolment</b></p>
            <p>privateSchoolEnrolment</p>
            <p>govExpenditure</p>
            <p>schoolLifeExpectancy</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default DetailedCountryInfo;

/** EXAMPLE GRAPHS
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
 */
