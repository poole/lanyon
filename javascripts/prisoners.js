/*eslint-env browser, jquery, es6*/
/*global d3*/

const avg = r => r.reduce((a, b) => a+b) / r.length
const data = []
const simIter = simulation()

let updateChart, clearChart

function *simulation() {
	const random = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min)

	while(true) {
		const mem = new Set()
		const counterGuy = random(1, 100)
		let counter = 0
		let sw = false
		let steps = 0

		while(counter < 99) {
			steps++
			const p = random(1, 100)
			if (p === counterGuy) {
				if (sw === true) {
					counter++
					sw = false
				}
			} else {
				if (sw === false && !mem.has(p)) {
					sw = true
					mem.add(p)
				}
			}
		}

		yield steps
	}
}

function drawchart() {
	const formatCount = d3.format(',.0f')

	const svg = d3.select('#histogram').append('svg')
	const margin = {top: 10, right: 30, bottom: 20, left: 30}
	const width = +parseInt(svg.style('width')) - margin.left - margin.right
	const height = +parseInt(svg.style('height')) - margin.top - margin.bottom

	const chart = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

	const x = d3.scaleLinear()
		.domain([5000, 15000])
		.rangeRound([0, width])

	chart.append('g')
		.attr('class', 'axis')
		.attr('transform', `translate(0,${height+2})`)
		.call(d3.axisBottom(x))

	chart.append('text')
		.attr('class', 'axis n-simulations')
		.attr('x', 0).attr('y', margin.top)
		.text(`n = ${data.length}`)

	clearChart = () => { svg.selectAll('.bar').remove() }

	updateChart = () => {
		const bins = d3.histogram()
			.domain(x.domain())
			.thresholds(x.ticks(50))(data)

		const y = d3.scaleLinear()
			.domain([0, d3.max(bins, d => d.length)])
			.range([height, 0])

		const bars = chart.selectAll('.bar').data(bins)

		// bars.exit().remove();
		bars.enter().append('g')
			.attr('class', 'bar')
			.attr('transform', d => `translate(${Math.ceil(x(d.x0))}, 0)`)
			.append('rect')
			.attr('x', 0)
			.attr('width', Math.floor(x(bins[0].x1) - Math.ceil(x(bins[0].x0))))
			.attr('y', height)
			.transition()
			.duration(500)
			.attr('height', d => height - y(d.length))
			.attr('y', d => y(d.length))

		bars.select('rect')
			.transition()
			.duration(500)
			.attr('height', d => height - y(d.length))
			.attr('y', d => y(d.length))

		chart.select('.n-simulations')
			.text(`n = ${data.length}`)
	}

	updateChart()

	chart.append('line')
		.attr('class', 'x-marker')
		.attr('x1', x(10418)).attr('x2', x(10418))
		.attr('y1', 0).attr('y2', height)
}

function update(n = 500) {
	const samples = Array.from(Array(n), simIter.next, simIter).map(o => o.value)
	Array.prototype.push.apply(data, samples)
	console.log(`After ${data.length} simulations, the expected value is ${avg(data)}`)
	updateChart()
}

function restart() {
	data.length = 0
	clearChart()
	update()
}

$(() => { drawchart(); update() })
