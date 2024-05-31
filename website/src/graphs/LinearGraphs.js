import React, { useEffect } from 'react';

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
    
    return <g transform={`translate(0, ${y})`} onClick={() => clicEvent(key)}>
        <text x={0} y={textBaseline} className='lineTitle' >{title}{title? " :" : ""}</text>
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
    const gdpCapita = data["gdpCapita"];
    const expenditure = data["expenditure"];

    if(!expenditure || !gdpCapita){
        return null;
    }


    const value_gdp = gdpCapita.Total.value;
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
        const value = expenditure[part].value;
        const valueFormatted = expenditure[part].valueFormatted;
        return <ExpenditureTypeGraph key={part} rect_gdp={rect_gdp} textLeft={part + " schools"} textRight="per student" value={value} valueFormatted={valueFormatted} y2={30*i} min={min.exp} max={max.exp}/>
    })

    return <g transform={`translate(0, ${y})`} onClick={() => clicEvent(key)}>
        <text x={0} y={0.65*30} className='lineTitle' >{title} :</text>
        {lines}
    </g>

}

function MultipleTypeGraph({variable, width, graph_xs, color, y, image, clicEvent, types, show_gender}){
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

    let y2 = 0;
    const lines = types.map((type, i) => {
        if(!show_gender && type.is_gender){
            return null;
        }
        const variable_updated = {
            ...variable,
            data: data[type.key],
            title: i===0? title : "",
            textLeft: type.title,
            textRight: ""
        }
        y2 += 30;
        return <BasicBarGraph key={type.title} variable={variable_updated} width={width} graph_xs={graph_xs} color={color} y={y2-30} clicEvent={clicEvent}/>
    })

    return <g transform={`translate(0, ${y})`} onClick={() => clicEvent(`${key} `)}>
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
            case 'private_school':
                const types = [
                    {
                        key:"Primary",
                        title:"Primary school",
                        is_gender: false
                    },{
                        key:"Secondary",
                        title:"Secondary school",
                        is_gender: false
                    }
                ]
                used_height += 60
                return <MultipleTypeGraph types={types} key={variable.title} variable={variable} width={width} graph_xs={graph_xs} color={color} y={used_height-60} clicEvent={clicEvent}/>;
            default:
                break;
        }
    })
    return <svg width={width} height={height}>
        <g>
            {graphs}
        </g>
        <line x1={graph_xs[0]} x2={graph_xs[0]} y1={0} y2={height} stroke={color}/>
        <line x1={graph_xs[1]} x2={graph_xs[1]} y1={0} y2={height} stroke={color}/>
    </svg>
}

export function LinearGraphAreaWithColor ({variables, width, height, graph_xs, clicEvent}) {
    let used_height=0
    const graphs = variables.map((variable, i) => {
        switch (variable.type){
            case 'basic':
                used_height += 30
                return <BasicBarGraph key={variable.title} variable={variable} width={width} graph_xs={graph_xs} color={variable.color} y={used_height-30} clicEvent={clicEvent}/>;
            case 'expenditure':
                used_height += 90
                return <ExpenditureGraph key={variable.title} variable={variable} width={width} graph_xs={graph_xs} color={variable.color} y={used_height-90} clicEvent={clicEvent}/>;
            case 'private_school':
                const types = [
                    {
                        key:"Primary",
                        title:"Primary school",
                        is_gender: false
                    },{
                        key:"Secondary",
                        title:"Secondary school",
                        is_gender: false
                    }
                ]
                used_height += 60
                return <MultipleTypeGraph types={types} key={variable.title} variable={variable} width={width} graph_xs={graph_xs} color={variable.color} y={used_height-60} clicEvent={clicEvent}/>;
            default:
                break;
        }
    })
    return <svg width={width} height={height}>
        <g>
            {graphs}
        </g>
        <line x1={graph_xs[0]} x2={graph_xs[0]} y1={0} y2={height} stroke="black"/>
        <line x1={graph_xs[1]} x2={graph_xs[1]} y1={0} y2={height} stroke="black"/>
    </svg>
}