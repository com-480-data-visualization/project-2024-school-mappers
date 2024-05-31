import React, { useEffect } from 'react';
import * as d3 from 'd3';

function BarGraphElement({height, fraction, rect_width, textBaseline, color, title}) {
    return <g transform={`translate(0, ${y})`}>
        <text x={0} y={textBaseline} className='lineTitle' >{title} :</text>
        <text x={graph_xs[0] -textMargin} y={textBaseline} className='lineTitle' textAnchor='end' width={100}>{textLeft}</text>
        <rect x={graph_xs[0]} y={0.1*height} width={rect_width} height={0.8*height} fill={color}/>
        <text x={label_x} y={textBaseline} className='valueFormatted' fill={(fraction<0.5) ? color : "white"} textAnchor={fraction<0.5 ? 'start' : 'end'}>{data?.valueFormatted} </text>
        <text x={graph_xs[1] + textMargin} y={textBaseline} className='rightValue' width={100}>{textRight}</text>
    </g>
}

function BasicBarGraph({variable, width, graph_xs, color, y}){
    const {
        title,
        min,
        max,
        data,
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
    
    
}

function ImageBarGraph({variable, width, graph_xs, color, y, image}){
    const {
        title,
        min,
        max,
        data,
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
    
    return <g transform={`translate(0, ${y})`}>
    <defs>
        <pattern id={image} x="0" y="0" width={0.8*height} height={0.8*height} patternUnits="userSpaceOnUse">
            <image x="0" y="0" width={0.8*height} height={0.8*height} href={`${process.env.PUBLIC_URL}/svg_images/${image}.svg`}/>
        </pattern>
    </defs>
        <text x={0} y={textBaseline} className='lineTitle' >{title} :</text>
        <text x={graph_xs[0] -textMargin} y={textBaseline} className='leftValue' textAnchor='end' width={100}>{textLeft}</text>
        <rect x={graph_xs[0]} y={0.1*height} width={rect_width} height={0.8*height} fill={`url(#${image})`}/>
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
            case 'people':
                used_height += 30
                return <ImageBarGraph key={variable.title} variable={variable} width={width} graph_xs={graph_xs} color={color} y={used_height-30} image="people-group"/>;
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
    const variables = [
        {
            title: "Population",
            type:"people",
            transform: d3.scaleLog([1e6, 1e10], [0,1]),
            min: 0,
            max: 1,
            data: data["Population"],
            textLeft: "1 million",
            textRight: "10 billion"
        },{
            title: "hdi",
            type:"basic",
            min: 0,
            max: 1,
            data: data["HDI"],
            textLeft: "0",
            textRight: "1"
        },{
            title: "HDI Rank",
            type:"basic",
            min: 193,
            max: 1,
            data: data["HDI Rank"],
            textLeft: "193",
            textRight: "1"
        },{
            title: "Gini index",
            type:"basic",
            min: 100,
            max: 0,
            data: data["Gini"],
            textLeft: "inequal",
            textRight: "equal"
        },{
            title: "GDP / Capita",
            type:"basic",
            min: 1000,
            max: 100000,
            data: data["GDP/Capita"],
            textLeft: "PPP$ ",
            textRight: ""
        },{
            title: "Gov. Expenditure on education",
            type:"basic",
            min: 0,
            max: 100,
            data: data["Gov. Expenditure on education"],
            textLeft: "0%",
            textRight: "100%"
        },{
            title: "Enrolment",
            type:"basic",
            min: 0,
            max: 100,
            data: data["Enrolment"].Total_secondary,
            textLeft: "0 %",
            textRight: "100 %"
        },{
            title: "Private School Enrolment",
            type:"basic",
            min: 0,
            max: 100,
            data: data["Private school enrolment"].Secondary,
            textLeft: "0 %",
            textRight: "100 %"
        },{
            title: "Dropout rate",
            type:"basic",
            min: 0,
            max: 100,
            data: data["Dropout"],
            textLeft: "0 %",
            textRight: "100 %"
        },{
            title: "School life expectancy",
            type:"basic",
            min: 0,
            max: 20,
            data: data["School life expectancy"].Total,
            textLeft: "0 years",
            textRight: "20 years"} 
    ]

  return <LinearGraphArea variables={variables} width={500} height={300} graph_xs={[250,400]} color={color}/>
}