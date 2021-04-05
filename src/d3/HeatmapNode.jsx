import * as d3 from 'd3'
// import React, { useEffect } from 'react'

export default function createGraph(data, title) {
  // console.log(data)
  // set the dimensions and margins of the graph
  const margin = {
    top: 30, right: 30, bottom: 30, left: 30,
  }
  const width = 450 - margin.left - margin.right
  const height = 450 - margin.top - margin.bottom

  // append the svg object to the body of the page
  const svg = d3.select('#area')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform',
      `translate(${margin.left},${margin.top})`)

  // Labels of row and columns
  const myGroups = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const myVars = ['1', '2', '3', '4', '5', '6', '7', '8']

  // Build X scales and axis:
  const x = d3.scaleBand()
    .range([0, width])
    .domain(myGroups)
    .padding(0.01)
  svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x))

  // Build X scales and axis:
  const y = d3.scaleBand()
    .range([height, 0])
    .domain(myVars)
    .padding(0.01)
  svg.append('g')
    .call(d3.axisLeft(y))

  // Build color scale
  const myColor = d3.scaleSequential()
    .interpolator(d3.interpolateOrRd)
    .domain([-5, 80])
  // const myColor = d3.scaleLinear()
  //   .range(['blue', 'red'])
  //   .domain([1, 5])

  // create a tooltip
  const tooltip = d3.select('#area')
    .append('div')
    .style('opacity', 0)
    .attr('class', 'tooltip')
    .style('background-color', 'white')
    .style('border', 'solid')
    .style('border-width', '2px')
    .style('border-radius', '5px')
    .style('display', 'inline-block')
    .style('position', 'absolute')
    .style('padding', '5px')

  // Three function that change the tooltip when user hover / move / leave a cell
  function mouseover() {
    tooltip
      .style('opacity', 1)
    d3.select(this)
      .style('stroke', 'black')
      .style('opacity', 1)
  }
  function mousemove(event, d) {
    tooltip
      .html(`The exact value of<br>this cell is: ${d.value}`)
      .style('left', `${d3.pointer(event, d)[0] + 10}px`)
      .style('top', `${d3.pointer(event, d)[1] - 70}px`)
  }
  function mouseleave() {
    tooltip
      .style('opacity', 0)
    d3.select(this)
      .style('stroke', 'none')
      // .style('opacity', 0.8)
  }

  svg.selectAll()
    .data(data, (d) => `${d.letter}:${d.number}`)
    .enter()
    .append('rect')
    .attr('x', (d) => x(d.letter))
    .attr('y', (d) => y(d.number))
    .attr('width', x.bandwidth())
    .attr('height', y.bandwidth())
    .style('fill', (d) => myColor(d.value))
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseleave', mouseleave)
    .on('touchstart', mouseover)
    .on('touchend', mouseleave)
    .on('touchmove', mousemove)

  svg.append('text')
    .attr('x', 400 / 2)
    .attr('y', -10)
    .style('text-anchor', 'middle')
    .text(title)
}

// export default function App() {
//   useEffect(async () => {
//     // const pls = await d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv')
//     const rawData = await fetch('https://lichess.org/api/games/user/hiyo_0?max=100',
//       {
//         headers: {
//           Accept: 'application/x-ndjson',
//         },
//       })
//     const rawJson = (await rawData.text()).match(/.+/g).map(JSON.parse)
//     const data = transformData(rawJson, 'hiyo_0')
//     createGraph(data[0], 'Frequency Of White Pieces')
//     createGraph(data[1], 'Frequency Of Black Pieces')
//   }, [])

//   return (
//     <div className="App">
//       <div id="area" height={900} width={450} />
//     </div>
//   )
// }
