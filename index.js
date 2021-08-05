'use strict'

const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const HapiSwagger = require('hapi-swagger')

const init = async () => {
	const server = Hapi.server({
		port: 3000,
		host: 'localhost'
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
