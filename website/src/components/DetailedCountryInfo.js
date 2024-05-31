import React, { forwardRef } from "react";
import IncomeBarChart from "../graphs/IncomeBarChart";
import PisaStackedBarChart from "../graphs/PisaStackedBarChart";
import { DetailedCountryLinearGraph } from '../graphs/DetailedCountryLinearGraph';
import * as d3 from 'd3';


const DetailedCountryInfo = forwardRef(
  ({ country, schools, onSelectSchool, onSelectVariable }, ref) => {
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

  const colorMap = d3.scaleOrdinal([0,1,2,3,4], ["red", "orange", "blue", "green", "yellow"]);
  const color = colorMap(id);

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
                {schools.map((school, index) => (
                  <li
                    key={index}
                    className="school-entry"
                    onClick={() => onSelectSchool(school)}
                  >
                    {school.schoolName} in {school.city}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <p>PISA repartition</p>
            </div>
          </div>

          <div className="card schools-column">
            <DetailedCountryLinearGraph data={country} color={color} clicEvent={onSelectVariable}/>
          </div>
        </div>
      </div>
    );
  }
);

export default DetailedCountryInfo;