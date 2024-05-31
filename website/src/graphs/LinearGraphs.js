import React, { useEffect } from 'react';
import * as d3 from 'd3';

function BasicBarGraph({variable, width, graph_xs, color, y, clicEvent}){
    const {
        title,
        min,
        max,
        data,
        key,
        transform,
        textRight,
        textLeft
    } = variable;

    if(!data){
        return null;
    }

    const value= transform ? transform(data.value) : data.value

    const textMargin = 5
    const height=30;
    const fraction = (value - min) / (max-min);
    const rect_width =  fraction * (graph_xs[1] - graph_xs[0]);
    const textBaseline = 0.65*height;
    const label_x = graph_xs[0] + rect_width + ((fraction<0.5) ? textMargin :  -textMargin)
    
    return <g transform={`translate(0, ${y})`} onClick={() => clicEvent(title)}>
        <text x={0} y={textBaseline} className='lineTitle' >{title} :</text>
        <text x={graph_xs[0] -textMargin} y={textBaseline} className='leftValue' textAnchor='end' width={100}>{textLeft}</text>
        <rect x={graph_xs[0]} y={0.1*height} width={rect_width} height={0.8*height} fill={color}/>
        <text x={label_x} y={textBaseline} className='valueFormatted' fill={(fraction<0.5) ? color : "white"} textAnchor={fraction<0.5 ? 'start' : 'end'}>{data?.valueFormatted} </text>
        <text x={graph_xs[1] + textMargin} y={textBaseline} className='rightValue' width={100}>{textRight}</text>
    </g>
}

function ExpenditureGraph({variable, width, graph_xs, color, y, image, clicEvent}){
    const {
        title,
        min,
        max,
        data,
        key,
        transform,
        textRight,
        textLeft
    } = variable;

    if(!data){
        return null
    }
    const gdpCapita = data["gdpCapita"]
    const expenditure = data["expenditure"]

    if(!expenditure || !gdpCapita){
        return null;
    }


    const value_gdp = gdpCapita.Total.value
    const fraction_gdp = (value_gdp - min.gdp) / (max.gdp-min.gdp);
    const rect_gdp =  fraction_gdp * (graph_xs[1] - graph_xs[0]);

    function ExpenditureTypeGraph({rect_gdp, value, valueFormatted, textLeft, textRight, y2, min, max}){
        const textMargin = 5;
        const height=30;
        const textBaseline = 0.65*height;

        const fraction = (value - min) / (max-min);
        const rect_width =  fraction * rect_gdp;
        const label_x = graph_xs[0] + rect_width + textMargin;

        return <g transform={`translate(0, ${y2})`}>
            <text x={graph_xs[0] -textMargin} y={textBaseline} className='leftValue' textAnchor='end' width={100}>{textLeft}</text>
            <rect x={graph_xs[0]} y={0.1*height} width={rect_gdp} height={0.8*height} stroke={color} fill="none"/>
            <rect x={graph_xs[0]} y={0.1*height} width={rect_width} height={0.8*height} fill={color}/>
            <text x={label_x} y={textBaseline} className='valueFormatted' fill={(fraction<0.5) ? color : "white"} textAnchor={fraction<0.5 ? 'start' : 'end'}>{valueFormatted} </text>
            <text x={graph_xs[1] + textMargin} y={textBaseline} className='rightValue' width={100}>{textRight}</text>
        </g>
    }

    const lines = ["Primary", "Secondary", "Tertiary"].map((part, i) => {
        const value = expenditure[part].value
        const valueFormatted = expenditure[part].valueFormatted
        return <ExpenditureTypeGraph key={part} rect_gdp={rect_gdp} textLeft={part + " schools"} textRight="per student" value={value} valueFormatted={valueFormatted} y2={30*i} min={min.exp} max={max.exp}/>
    })

    return <g transform={`translate(0, ${y})`} onClick={() => clicEvent(key)}>
        <text x={0} y={0.65*30} className='lineTitle' >{title} :</text>
        {lines}
    </g>

}

/*<defs>
        <pattern id={image} x="0" y="0" width={0.8*height} height={0.8*height} patternUnits="userSpaceOnUse">
            <image x="0" y="0" width={0.8*height} height={0.8*height} href={`${process.env.PUBLIC_URL}/svg_images/${image}.svg`}/>
        </pattern>
    </defs>*/

export default function LinearGraphArea ({variables, width, height, graph_xs, color, clicEvent}) {
    let used_height=0
    const graphs = variables.map((variable, i) => {
        switch (variable.type){
            case 'basic':
                used_height += 30
                return <BasicBarGraph key={variable.title} variable={variable} width={width} graph_xs={graph_xs} color={color} y={used_height-30} clicEvent={clicEvent}/>;
            case 'expenditure':
                used_height += 90
                return <ExpenditureGraph key={variable.title} variable={variable} width={width} graph_xs={graph_xs} color={color} y={used_height-90} clicEvent={clicEvent}/>;
            default:
                break;
        }
    })
    return <svg width={width} height={height}>
        <line x1={graph_xs[0]} x2={graph_xs[0]} y1={0} y2={height} stroke={color}/>
        <line x1={graph_xs[1]} x2={graph_xs[1]} y1={0} y2={height} stroke={color}/>
        <g>
            {graphs}
        </g>
    </svg>
}

export function DetailedCountryLinearGraph ({data, color, clicEvent}) {
    const variables = [
        {
            title: "Population",
            type:"basic",
            transform: d3.scaleLog([1e6, 1e10], [0,1]),
            min: 0,
            max: 1,
            data: data["Population"],
            key: "Population",
            textLeft: "1 million",
            textRight: "10 billion"
        },{
            title: "hdi",
            type:"basic",
            min: 0,
            max: 1,
            data: data["HDI"],
            key: "HDI",
            textLeft: "0",
            textRight: "1"
        },{
            title: "HDI Rank", 
            type:"basic",
            min: 193,
            max: 1,
            data: data["HDI Rank"],
            key: "HDI Rank",
            textLeft: "193",
            textRight: "1"
        },{
            title: "Gini index",
            type:"basic",
            min: 100,
            max: 0,
            data: data["Gini"],
            key: "Gini",
            textLeft: "inequal",
            textRight: "equal"
        },{
            title: "GDP / Capita",
            type:"basic",
            min: 1000,
            max: 100000,
            data: data["GDP/Capita"].Total,
            key: "GDP/Capita",
            textLeft: "PPP$ ",
            textRight: ""
        },{
            title: "Gov. Expenditure on education",
            type:"expenditure",
            min: {gdp: 1000, exp: 0},
            max: {gdp: 100000, exp: 100},
            data: {gdpCapita : data["GDP/Capita"], expenditure: data["Gov. Expenditure on education"]},
            key: "Gov. Expenditure on education",
            textLeft: "0%",
            textRight: "100%"
        },{
            title: "Enrolment",
            type:"basic",
            min: 0,
            max: 100,
            data: data["Enrolment"].Total_secondary,
            key: "Enrolment",
            textLeft: "0 %",
            textRight: "100 %"
        },{
            title: "Private School Enrolment",
            type:"basic",
            min: 0,
            max: 100,
            data: data["Private school enrolment"].Secondary,
            key: "Private school enrolment",
            textLeft: "0 %",
            textRight: "100 %"
        },{
            title: "Dropout rate",
            type:"basic",
            min: 0,
            max: 100,
            data: data["Dropout"],
            key: "Dropout",
            textLeft: "0 %",
            textRight: "100 %"
        },{
            title: "School life expectancy",
            type:"basic",
            min: 0,
            max: 20,
            data: data["School life expectancy"].Total,
            key: "School life expectancy",
            textLeft: "0 years",
            textRight: "20 years"} 
    ]

  return <LinearGraphArea variables={variables} width={500} height={300} graph_xs={[250,400]} color={color} clicEvent={clicEvent}/>
}