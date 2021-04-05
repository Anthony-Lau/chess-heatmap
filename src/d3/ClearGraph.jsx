import * as d3 from 'd3'

export default function clearGraph() {
  d3.selectAll('#area svg').remove()
}
