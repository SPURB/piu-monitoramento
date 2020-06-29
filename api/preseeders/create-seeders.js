let seeder = {}
const path = require('path')
const { convertModel } = require('./builders')
const models = require('./models')

module.exports = {
	setSeeder: (index) => {
		const data = convertModel(`${path.resolve(__dirname, './')}/piu-monitoramento_v2.xlsx`, models[index])
		seeder = data
	},
	getSeeder: () => {
		return seeder
	}
}
