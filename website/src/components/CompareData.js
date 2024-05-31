import React, { forwardRef } from "react";
import * as d3 from 'd3';
import { LinearGraphAreaWithColor } from "../graphs/LinearGraphs";

const CompareData = forwardRef(({ countries, variable, onSelectCountry }, ref) => {

  const variables_definition = {
    "Population": {
        title: "Population",
        type: "basic",
        transform: d3.scaleLog([1000000, 10000000000], [0, 1]),
        min: 0,
        max: 1,
        data_func: (data) => data["Population"],
        key: "Population",
        textLeft: "1 million",
        textRight: "10 billion"
    }, "hdi": {
        title: "hdi",
        type: "basic",
        min: 0,
        max: 1,
        data_func: (data) => data["HDI"],
        key: "HDI",
        textLeft: "0",
        textRight: "1"
    }, "HDI Rank": {
        title: "HDI Rank",
        type: "basic",
        min: 193,
        max: 1,
        data_func: (data) => data["HDI Rank"],
        key: "HDI Rank",
        textLeft: "193",
        textRight: "1"
    }, "Gini index": {
        title: "Gini index",
        type: "basic",
        min: 100,
        max: 0,
        data_func: (data) => data["Gini"],
        key: "Gini",
        textLeft: "inequal",
        textRight: "equal"
    }, "GDP / Capita": {
        title: "GDP / Capita",
        type: "basic",
        min: 1000,
        max: 100000,
        data_func: (data) => data["GDP/Capita"].Total,
        key: "GDP/Capita",
        textLeft: "PPP$ ",
        textRight: ""
    }, "Gov. Expenditure on education": {
        title: "Gov. Expenditure on education",
        type: "expenditure",
        min: { gdp: 1000, exp: 0 },
        max: { gdp: 100000, exp: 100 },
        data_func: (data) => { return {gdpCapita: data["GDP/Capita"], expenditure: data["Gov. Expenditure on education"]}; },
        key: "Gov. Expenditure on education",
        textLeft: "0%",
        textRight: "100%"
    }, "Enrolment": {
        title: "Enrolment",
        type: "basic",
        min: 0,
        max: 100,
        data_func: (data) => data["Enrolment"].Total_secondary,
        key: "Enrolment",
        textLeft: "0 %",
        textRight: "100 %"
    }, "Private School Enrolment": {
        title: "Private School Enrolment",
        type: "private_school",
        min: 0,
        max: 100,
        data_func: (data) => data["Private school enrolment"],
        key: "Private school enrolment",
        textLeft: "0 %",
        textRight: "100 %"
    }, "School life expectancy": {
        title: "School life expectancy",
        type: "basic",
        min: 0,
        max: 20,
        data_func: (data) => data["School life expectancy"].Total,
        key: "School life expectancy",
        textLeft: "0 years",
        textRight: "20 years"
    }
  };
  const data_funcs = {
    "Population": (data) => data["Population"],
     "hdi": (data) => data["HDI"],
     "HDI Rank": (data) => data["HDI Rank"],
     "Gini index": (data) => data["Gini"],
     "GDP / Capita": (data) => data["GDP/Capita"].Total,
     "Gov. Expenditure on education": (data) => { return {gdpCapita: data["GDP/Capita"], expenditure: data["Gov. Expenditure on education"]}; },
     "Enrolment": (data) => data["Enrolment"].Total_secondary,
     "Private School Enrolment": (data) => data["Private school enrolment"],
     "School life expectancy": (data) => data["School life expectancy"].Total
  };

  const colorMap = d3.scaleOrdinal([0,1,2,3,4], ["#467f66", "#8bc2bf", "#c27355", "#edaf5a", "#7e57c2"]);
  
  const variables = countries.map((country,i) =>{
    return {...variables_definition[variable] , data: data_funcs[variable](country), color:colorMap(country.id), title:country.name};
  });
  

  

  return (
  <div ref={ref} className="big-card">
    <h2>{variable}</h2>
    <LinearGraphAreaWithColor variables={variables} width={1000} height="200" graph_xs={[200, 900]} clicEvent={onSelectCountry}/>
  </div>
  );
});

export default CompareData;
