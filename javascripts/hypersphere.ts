/// <reference types="jquery" />
/// <reference types="d3" />
/// <reference types="d3-hexbin" />

// ------------------------------------------
//  Global Stuff
// ------------------------------------------
const random = () => Math.random() * 2 - 1
const dist = (x, y) => Math.sqrt(x * x + y * y)

let data = [],
  distance = [],
  chart, hist,
  animationTimer

// ------------------------------------------
//  Hit map
// ------------------------------------------
function drawHitMap() {
  const svg = d3.select('#hitmap').append('svg')
  const margin = { top: 20, right: 20, bottom: 20, left: 40 }
  const width = +parseInt(svg.style('width')) - margin.left - margin.right
  const height = +parseInt(svg.style('height')) - margin.top - margin.bottom
  const edge = Math.min(width, height)
  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

  g.append('circle')
    .attr('class', 'border')
    .attr('r', edge / 2)
    .attr('transform', `translate(${edge / 2},${edge / 2})`)

  g.append('circle')
    .attr('class', 'outer-circle')
    .attr('r', edge * 0.4)
    .attr('transform', `translate(${edge / 2},${edge / 2})`)

  const x = d3.scaleLinear().domain([-1, 1]).range([0, edge])
  const y = d3.scaleLinear().domain([-1, 1]).range([edge, 0])

  g.append('g').attr('class', 'axis')
    .attr('transform', 'translate(-10,0)')
    .call(d3.axisLeft(y))

  g.append('g').attr('class', 'axis')
    .attr('transform', `translate(0,${height - 10})`)
    .call(d3.axisBottom(x))

  return function updateChart() {
    console.log('Updating...')

    g.selectAll('.point')
      .data(data)
      .enter().append('g')
      .attr('class', d => d[0] * d[0] + d[1] * d[1] <= 1 ? 'point highlighted' : 'point normal')
      .attr('transform', d => `translate(${x(d[0])}, ${y(d[1])})`)
      .append('circle').attr('r', 0).transition().duration(500).attr('r', 4)
  }
}

// ------------------------------------------
//  Hit map (Hex version)
// ------------------------------------------
function drawHitMapHex() {
  const svg = d3.select('#hitmap').append('svg')
  const margin = { top: 20, right: 20, bottom: 30, left: 40 }
  const width = +parseInt(svg.style('width')) - margin.left - margin.right
  const height = +parseInt(svg.style('height')) - margin.top - margin.bottom
  const edge = Math.min(width, height)
  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

  const binsize = Math.floor(width / 20 / 2)
  const hexbin = d3.hexbin().radius(binsize + 1)

  const x = d3.scaleLinear().domain([-width / 2, width / 2]).range([0, width])
  const y = d3.scaleLinear().domain([-height / 2, height / 2]).range([height, 0])

  g.append('g')
    .attr('class', 'axis axis--y')
    .attr('transform', d => `translate(-${1.5 * binsize}, 0)`)
    .call(d3.axisLeft(d3.scaleLinear().domain([-1, 1]).range([height - 1.5 * binsize, 1.5 * binsize])))

  g.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', d => `translate(${-.5 * binsize}, ${height + binsize * .5})`)
    .call(d3.axisBottom(d3.scaleLinear().domain([-1, 1]).range([0, width + .5 * binsize])))

  return function updateChart() {
    const binned = hexbin(data.map(d => [d[0] * width / 2, d[1] * width / 2])),
      maxsize = d3.max<number>(binned.map(d => d.length)),
      size = d3.scaleLinear().domain([0, maxsize]).range([0, binsize]),
      opacity = d3.scaleLinear().domain([0, maxsize]).range([0, 1]),
      heatmap = g.selectAll('.bin').data(binned)

    heatmap.exit().remove()

    heatmap.enter().append('g')
      .attr('class', d => dist(d.x, d.y) <= width / 2 ? 'bin highlighted' : 'bin normal')
      .attr('transform', d => `translate(${x(d.x)}, ${y(d.y)})`)
      .append('circle')
      .attr('r', 0)
      .attr('opacity', 0)
      .transition()
      .duration(500)
      .attr('r', d => size(d.length))
      .attr('opacity', d => opacity(d.length))

    heatmap.select('circle')
      .transition()
      .duration(500)
      .attr('r', d => size(d.length))
      .attr('opacity', d => opacity(d.length))
  }
}

// ------------------------------------------
//  Histogram
// ------------------------------------------
function drawHistogram() {
  const formatCount = d3.format(',.0f')

  const svg = d3.select('#histogram').append('svg')
  const margin = { top: 20, right: 30, bottom: 27, left: 30 }
  const width = +parseInt(svg.style('width')) - margin.left - margin.right
  const height = +parseInt(svg.style('height')) - margin.top - margin.bottom

  const chart = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

  const x = d3.scaleLinear().domain([0, 1]).range([0, width])

  chart.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x))

  return function updateHistogram() {
    const bins = d3.histogram()
      .domain(x.domain())
      .thresholds(x.ticks(10))(distance)

    const y = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length)])
      .range([height, 0])

    const bars = chart.selectAll('.bar').data(bins)

    bars.exit().remove()

    const bar = bars.enter().append('g')
      .attr('class', 'bar')
      .attr('transform', d => `translate(${Math.ceil(x(d.x0))}, -2)`)

    bar.append('rect')
      .attr('x', 0)
      .attr('width', Math.floor(x(bins[0].x1) - x(bins[0].x0)))
      .attr('y', height)
      .transition().duration(500)
      .attr('height', d => height - y(d.length))
      .attr('y', d => y(d.length))

    bar.append('text')
      .attr('dy', '-0.5em')
      .attr('x', Math.floor(x(bins[0].x1) - x(bins[0].x0)) / 2)
      .attr('text-anchor', 'middle')
      .attr('y', height)
      .text(d => d.length === 0 ? '' : d.length)
      .transition().duration(500)
      .attr('y', d => y(d.length))

    bars.select('rect')
      .transition().duration(500)
      .attr('height', d => height - y(d.length))
      .attr('y', d => y(d.length))

    bars.select('text')
      .text(d => d.length === 0 ? '' : d.length)
      .transition().duration(500)
      .attr('y', d => y(d.length))
  }
}

// ------------------------------------------
//  Statistics
// ------------------------------------------
function updateStatistics() {
  const inside = distance.filter(d => d <= 1)
  const ring = inside.filter(d => d >= 0.8)
  const ratio = inside.length / data.length
  const rratio = ring.length / inside.length
  const earea = ratio * 4

  $('#statistics #ratio').html((ratio * 100).toPrecision(4))
  $('#statistics #estimated-area').html(earea.toPrecision(4))
  $('#statistics #outer-ring').html((rratio * 100).toPrecision(2))
  $('#statistics #iterations').html(data.length.toString())
}

// ------------------------------------------
//  User Interface
// ------------------------------------------
function simulate(n = 100) {
  Array.prototype.push.apply(data, d3.range(n).map(() => [random(), random()]))
  distance = data.map(d => dist(d[0], d[1]))
  chart()
  hist()
  updateStatistics()
}

function reset() {
  data = []
  simulate(0)
}

function startAnimation(n = 10, t = 1000) {
  animationTimer = d3.interval(_ => simulate(10), t)
}

function stopAnimation() {
  animationTimer.stop()
}

$(document).ready(() => {
  chart = drawHitMapHex()
  hist = drawHistogram()
})
