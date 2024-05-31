import React from 'react';
import * as d3 from 'd3';
import LinearGraphArea from './LinearGraphs';


export function DetailedCountryLinearGraph({ data, color, clicEvent }) {
    const variables = [
        {
            title: "Population",
            type: "basic",
            transform: d3.scaleLog([1000000, 10000000000], [0, 1]),
            min: 0,
            max: 1,
            data: data["Population"],
            key: "Population",
            textLeft: "1 million",
            textRight: "10 billion"
        }, {
            title: "HDI",
            type: "basic",
            min: 0,
            max: 1,
            data: data["HDI"],
            key: "HDI",
            textLeft: "0",
            textRight: "1"
        }, {
            title: "HDI Rank",
            type: "basic",
            min: 193,
            max: 1,
            data: data["HDI Rank"],
            key: "HDI Rank",
            textLeft: "193",
            textRight: "1"
        }, {
            title: "Gini index",
            type: "basic",
            min: 100,
            max: 0,
            data: data["Gini"],
            key: "Gini index",
            textLeft: "inequal",
            textRight: "equal"
        }, {
            title: "GDP / Capita",
            type: "basic",
            min: 1000,
            max: 100000,
            data: data["GDP/Capita"].Total,
            key: "GDP / Capita",
            textLeft: "PPP$ ",
            textRight: ""
        }, {
            title: "Gov. Expenditure on education",
            type: "expenditure",
            min: { gdp: 1000, exp: 0 },
            max: { gdp: 100000, exp: 100 },
            data: { gdpCapita: data["GDP/Capita"], expenditure: data["Gov. Expenditure on education"] },
            key: "Gov. Expenditure on education",
            textLeft: "0%",
            textRight: "100%"
        }, {
            title: "Enrolment",
            type: "basic",
            min: 0,
            max: 100,
            data: data["Enrolment"].Total_secondary,
            key: "Enrolment",
            textLeft: "0 %",
            textRight: "100 %"
        }, {
            title: "Private School Enrolment",
            type: "private_school",
            min: 0,
            max: 100,
            data: data["Private school enrolment"],
            key: "Private School Enrolment",
            textLeft: "0 %",
            textRight: "100 %"
        }, {
            title: "School life expectancy",
            type: "basic",
            min: 0,
            max: 20,
            data: data["School life expectancy"].Total,
            key: "School life expectancy",
            textLeft: "0 years",
            textRight: "20 years"
        }
    ];

    return <LinearGraphArea variables={variables} width={600} height={500} graph_xs={[350, 500]} color={color} clicEvent={clicEvent} />;
}
