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
    } = variable

    const height=80
    const label_length = 30
    const rect_width = (value - min) / (max-min) * (graph_xs[1] - graph_xs[0])

    return <g height={height} width={width} transform={`translate(0, ${y})`}>
        <text x={0} y={height} className='lineTitle' textLength={graph_xs[0]-label_length}>{title} :</text>
        <text x={graph_xs[0]-label_length} y={height} className='leftValue' textLength={label_length}>{textLeft}</text>
        <rect x={graph_xs[0]} y={0.1*height} width={rect_width} />
        <text x={graph_xs[1]} y={height} className='leftValue' textLength={label_length}>{textRight}</text>
    </g>
}

export default function LinearGraphArea ({variables, width, height, graph_xs, color}) {
    const margin = {top : 10, bottom: 10, left : 80, right : 40}
    const transform = `translate(${margin.left}, ${margin.right})`

    const graphs = variables.map((variable, i) => {
        return <BasicBarGraph variable={variable} width={width} graph_xs={graph_xs} color={color} y={i*80}/>
    })
    return <svg width={width} height={height}>
        <g transform={transform}>
            {graphs}
        </g>
    </svg>
}