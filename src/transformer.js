'use strict'

const Joi = require('joi')

const childSchema = Joi.object({
	id: Joi.number().required(),
	title: Joi.string().required(),
	level: Joi.number().required(),
	children: Joi.array(),
	parent_id: Joi.number().required().allow(null)
})

module.exports.requestSchema = Joi.object().pattern(Joi.string(), Joi.array().items(childSchema))

module.exports.handler = (request, h) => {
	const elements = Object.values(request.payload).flat()
	const mapping = elements.reduce((map, e) => {
		map[e.id] = e
		return map
	}, {})
	elements.filter(x => x.parent_id != null)
			.forEach(x => mapping[x.parent_id].children.push(x))
	return Object.values(mapping).filter(x => x.parent_id == null)
}
