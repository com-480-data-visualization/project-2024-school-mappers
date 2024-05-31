import React, { forwardRef } from "react";
import IncomeBarChart from "../graphs/IncomeBarChart";
import PisaStackedBarChart from "../graphs/PisaStackedBarChart";
import LinearGraphArea from "../graphs/LinearGraphs";

const DetailedCountryInfo = forwardRef(({ country, onSelectSchool, onSelectVariable }, ref) => {
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

  const variables = [
    {title: "population",
    min: 1e6,
    max: 1e10,
    value: population.value,
    valueFormatted: population.valueFormatted,
    textLeft: "1 million",
    textRight: "10 billion"},
    {title: "hdi",
    min: 0,
    max: 1,
    value: hdi.value,
    valueFormatted: hdi.valueFormatted,
    textLeft: "0",
    textRight: "1"},
    {title: "hdiRank",
    min: 193,
    max: 1,
    value: hdiRank.value,
    valueFormatted: hdiRank.valueFormatted,
    textLeft: "193",
    textRight: "1"},
    {title: "Gini index",
    min: 100,
    max: 0,
    value: gini.value,
    valueFormatted: gini.valueFormatted,
    textLeft: "inequal",
    textRight: "equal"},
    {title: "GDP / Capita",
    min: 1000,
    max: 100000,
    value: gdpCapita.value,
    valueFormatted: gdpCapita.valueFormatted,
    textLeft: "PPP$ ",
    textRight: ""},
    {title: "Enrolment",
    min: 0,
    max: 100,
    value: enrolment.value,
    valueFormatted: enrolment.valueFormatted,
    textLeft: "0 %",
    textRight: "100 %"}, /*
    {title: "Private School Enrolment",
    min: 0,
    max: 100,
    value: privateSchoolEnrolment.value,
    valueFormatted: privateSchoolEnrolment.valueFormatted,
    textLeft: "0 %",
    textRight: "100 %"},*/
    {title: "Dropout rate",
    min: 0,
    max: 100,
    value: dropout.value,
    valueFormatted: dropout.valueFormatted,
    textLeft: "0 %",
    textRight: "100 %"},
    {title: "schoolLifeExpectancy",
    min: 0,
    max: 20,
    value: schoolLifeExpectancy.value,
    valueFormatted: schoolLifeExpectancy.valueFormatted,
    textLeft: "0 years",
    textRight: "20 years"} 
  ]
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
          <LinearGraphArea variables={variables} width={500} height={300} graph_xs={[250,400]} color="red"/>

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
