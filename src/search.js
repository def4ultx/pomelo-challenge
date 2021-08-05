'use strict'

const Joi = require('joi')
const fetch = require('node-fetch')

module.exports.querySchema = Joi.object({
	limit: Joi.number().integer().min(1).max(100).default(10),
	page: Joi.number().integer().min(1).max(100).default(1)
})

module.exports.handler = async (request, h) => {
	const param = request.query
	const url = 'https://api.github.com/search/repositories?q=nodejs&sort=stars&order=desc' +
				'&page=' + param.page +
				'&per_page=' + param.limit

	const result = await fetch(url).then(r => r.json())

	const maxPage = 5
	const halfMaxPage = 2
	const showPages = [...Array(maxPage).keys()]
			.map(i => i + param.page - halfMaxPage)
			.filter(x => x > 0)
			.map(i => {
				return { page: i, limit: param.limit }
			})

	const data = {
		data: result,
		pagination: {
			prev: param.page > 1 ? param.page - 1 : 1,
			next: param.page + 1,
			limit: param.limit,
			shown: showPages
		}
	}

	return h.view('index', data)
}
