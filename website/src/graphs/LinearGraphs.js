import React, { useEffect } from 'react';
import * as d3 from 'd3';

function BasicBarGraph({variable, width, graph_xs, color, y}){
    const {
        title,
        min,
        max,
        data,
        textRight,
        textLeft
    } = variable;

    if(!data){
        return null;
    }

    const textMargin = 5
    const height=30;
    const fraction = (data.value - min) / (max-min);
    const rect_width =  fraction * (graph_xs[1] - graph_xs[0]);
    const textBaseline = 0.65*height;
    const label_x = graph_xs[0] + rect_width + ((fraction<0.5) ? textMargin :  -textMargin)
    
    return <g transform={`translate(0, ${y})`}>
        <text x={0} y={textBaseline} className='lineTitle' >{title} :</text>
        <text x={graph_xs[0] -textMargin} y={textBaseline} className='leftValue' textAnchor='end' width={100}>{textLeft}</text>
        <rect x={graph_xs[0]} y={0.1*height} width={rect_width} height={0.8*height} fill={color}/>
        <text x={label_x} y={textBaseline} className='valueFormatted' fill={(fraction<0.5) ? color : "white"} textAnchor={fraction<0.5 ? 'start' : 'end'}>{data?.valueFormatted} </text>
        <text x={graph_xs[1] + textMargin} y={textBaseline} className='rightValue' width={100}>{textRight}</text>
    </g>
}

export default function LinearGraphArea ({variables, width, height, graph_xs, color}) {
    const margin = {top : 10, bottom: 10, left : 80, right : 40}
    // const transform = `translate(${margin.left}, ${margin.right})`

    let used_height=0
    const graphs = variables.map((variable, i) => {
        switch (variable.type){
            case 'basic':
                used_height += 30
                return <BasicBarGraph key={variable.title} variable={variable} width={width} graph_xs={graph_xs} color={color} y={used_height-30}/>;
            default:
                break;
        }
    })
    return <svg width={width} height={height}>
        <line x1={graph_xs[0]} x2={graph_xs[0]} y1={0} y2={height} stroke={color}/>
        <line x1={graph_xs[1]} x2={graph_xs[1]} y1={0} y2={height} stroke={color}/>
        <g /* transform={transform} */>
            {graphs}
        </g>
    </svg>
}

export function DetailedCountryLinearGraph ({data, color}) {
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
      } = data;
    const variables = [
        {title: "Population",
        type:"basic",
        min: 1e6,
        max: 1e10,
        data: population,
        textLeft: "1 million",
        textRight: "10 billion"},
        {title: "hdi",
        type:"basic",
        min: 0,
        max: 1,
        data: hdi,
        textLeft: "0",
        textRight: "1"},
        {title: "HDI Rank",
        type:"basic",
        min: 193,
        max: 1,
        data: hdiRank,
        textLeft: "193",
        textRight: "1"},
        {title: "Gini index",
        type:"basic",
        min: 100,
        max: 0,
        data: gini,
        textLeft: "inequal",
        textRight: "equal"},
        {title: "GDP / Capita",
        type:"basic",
        min: 1000,
        max: 100000,
        data: gdpCapita,
        textLeft: "PPP$ ",
        textRight: ""},
        {title: "Enrolment",
        type:"basic",
        min: 0,
        max: 100,
        data: enrolment.Total_secondary,
        textLeft: "0 %",
        textRight: "100 %"}, 
        {title: "Private School Enrolment",
        type:"basic",
        min: 0,
        max: 100,
        data: privateSchoolEnrolment.Secondary,
        textLeft: "0 %",
        textRight: "100 %"},
        {title: "Dropout rate",
        type:"basic",
        min: 0,
        max: 100,
        data: dropout,
        textLeft: "0 %",
        textRight: "100 %"},
        {title: "schoolLifeExpectancy",
        type:"basic",
        min: 0,
        max: 20,
        data: schoolLifeExpectancy,
        textLeft: "0 years",
        textRight: "20 years"} 
    ]

  return <LinearGraphArea variables={variables} width={500} height={300} graph_xs={[250,400]} color={color}/>
}