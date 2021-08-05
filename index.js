'use strict'

const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const HapiSwagger = require('hapi-swagger')

const Transformer = require('./src/transformer.js')
const Search = require('./src/search.js')

const init = async () => {
	const server = Hapi.server({
		port: 3000,
		host: 'localhost'
	})

	await server.register(require('@hapi/vision'))

	server.route({
		method: 'POST',
		path: '/transform',
		handler: Transformer.handler,
		options: {
			tags: ['api'],
			validate: {
				payload: Transformer.requestSchema
			}
		}
	})

	server.route({
		method: 'GET',
		path: '/',
		handler: Search.handler,
		options: {
			tags: ['api'],
			validate: {
				query: Search.querySchema
			}
		}
	})

	server.views({
		engines: {
			html: require('handlebars')
		},
		relativeTo: __dirname,
		path: 'templates'
	})

	const swaggerOptions = {
		info: {
			title: 'Pomelo Challenge',
			version: '1.0.0'
		}
	}

	await server.register([
		Inert,
		Vision,
		{
			plugin: HapiSwagger,
			options: swaggerOptions
		}
	])

	await server.start()
	console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
	console.log(err)
	process.exit(1)
})

init()
