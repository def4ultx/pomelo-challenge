'use strict'

const Transformer = require('./../src/transformer.js')

test('transform empty data', () => {
	const request = {
		payload: {}
	}
	const expected = []

	expect(Transformer.handler(request)).toStrictEqual(expected)
})

test('transform data correctly', () => {
	const data = {
		0: [
			{
				id: 10,
				title: 'House',
				level: 0,
				children: [],
				parent_id: null
			}
		],
		1: [
			{
				id: 12,
				title: 'Red Roof',
				level: 1,
				children: [],
				parent_id: 10
			},
			{
				id: 18,
				title: 'Blue Roof',
				level: 1,
				children: [],
				parent_id: 10
			},
			{
				id: 13,
				title: 'Wall',
				level: 1,
				children: [],
				parent_id: 10
			}
		],
		2: [
			{
				id: 17,
				title: 'Blue Window',
				level: 2,
				children: [],
				parent_id: 12
			},
			{
				id: 16,
				title: 'Door',
				level: 2,
				children: [],
				parent_id: 13
			},
			{
				id: 15,
				title: 'Red Window',
				level: 2,
				children: [],
				parent_id: 12
			}
		]
	}

	const request = {
		payload: data
	}

	const expected = [{
		id: 10,
		title: 'House',
		level: 0,
		children: [
			{
				id: 12,
				title: 'Red Roof',
				level: 1,
				children: [
					{
						id: 17,
						title: 'Blue Window',
						level: 2,
						children: [],
						parent_id: 12
					},
					{
						id: 15,
						title: 'Red Window',
						level: 2,
						children: [],
						parent_id: 12
					}
				],
				parent_id: 10
			},
			{
				id: 18,
				title: 'Blue Roof',
				level: 1,
				children: [],
				parent_id: 10
			},
			{
				id: 13,
				title: 'Wall',
				level: 1,
				children: [{
					id: 16,
					title: 'Door',
					level: 2,
					children: [],
					parent_id: 13
				}],
				parent_id: 10
			}
		],
		parent_id: null
	}]

	expect(Transformer.handler(request)).toStrictEqual(expected)
})
