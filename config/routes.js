
var deployments = require('../app/controllers/deployments')

module.exports = function (app) {
	// home route
	app.get('/', deployments.index);
	
	// deployments route
	app.get('/deployments', deployments.index);
	app.get('/deployments/new', deployments.new);
	app.post('/deployments', deployments.create);
	app.get('/deployments/:id/edit', deployments.edit)
	app.put('/deployments/:id', deployments.update)
	app.get('/deployments/remove', deployments.remove);
	
	app.param('id', deployments.load)
	
}