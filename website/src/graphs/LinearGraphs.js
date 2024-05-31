import React, { useEffect } from 'react';
import * as d3 from 'd3';

function BasicBarGraph({variable, width, graph_xs, color, y}){
    const {
        title,
        min,
        max,
        value,
        valueFormatted,
        textRight,
        textLeft
    } = variable;

    if(!value){
        return null;
    }

    const textMargin = 5
    const height=30;
    const label_length = 100;
    const fraction = (value - min) / (max-min);
    const rect_width =  fraction * (graph_xs[1] - graph_xs[0]);
    const textBaseline = 0.65*height;
    const label_x = graph_xs[0] + rect_width + ((fraction<0.5) ? textMargin :  -textMargin)
    
    return <g transform={`translate(0, ${y})`}>
        <text x={0} y={textBaseline} className='lineTitle' >{title} :</text>
        <text x={graph_xs[0] -textMargin} y={textBaseline} className='leftValue' textAnchor='end' width={100}>{textLeft}</text>
        <rect x={graph_xs[0]} y={0.1*height} width={rect_width} height={0.8*height} fill={color}/>
        <text x={label_x} y={textBaseline} className='valueFormatted' fill={(fraction<0.5) ? color : "white"} textAnchor={fraction<0.5 ? 'start' : 'end'}>{valueFormatted} </text>
        <text x={graph_xs[1] + textMargin} y={textBaseline} className='rightValue' width={100}>{textRight}</text>
    </g>
}

export default function LinearGraphArea ({variables, width, height, graph_xs, color}) {
    const margin = {top : 10, bottom: 10, left : 80, right : 40}
    // const transform = `translate(${margin.left}, ${margin.right})`

    const graphs = variables.map((variable, i) => {
        return <BasicBarGraph variable={variable} width={width} graph_xs={graph_xs} color={color} y={i*30}/>
    })
    return <svg width={width} height={height}>
        <line x1={graph_xs[0]} x2={graph_xs[0]} y1={0} y2={height} stroke={color}/>
        <line x1={graph_xs[1]} x2={graph_xs[1]} y1={0} y2={height} stroke={color}/>
        <g /* transform={transform} */>
            {graphs}
        </g>
    </svg>
}