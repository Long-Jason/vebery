var mongoose = require('mongoose')
  , Deployment = mongoose.model('deploymentcollection')
  , _ = require('underscore')

exports.load = function(req, res, next, id){
	Deployment.load(id, function (err, deployment) {
		if (err) return next(err)
		if (!deployment) return next(new Error('not found'))
		req.deployment = deployment
		next()
	})
}

/*
 * GET home page.
 */
exports.index = function(req, res){
	Deployment.list(function(err, deployments){
		if (err) return res.render('500')
		res.render('deployments/index', {
			title: "设备安装信息",
			deployments: deployments
		})
	});
};

exports.new = function(req, res){
	res.render('deployments/new', {
		title : "新建",
		deployment : new Deployment({})
	});
};

exports.create = function(req, res){
	var newDeploy = new Deployment({
		sn : req.body.sn,
		region : req.body.region,
		address : req.body.address,
		installDate : req.body.installDate,
		qcDate : req.body.qcDate,
		maintanceRecord : req.body.maintanceRecord,
		remark : req.body.remark,
	});
	newDeploy.save(function(err){
		if(err) {
			res.send("There was a problem adding the information to the database.");
		} else {
			res.redirect("/");
		}
	});
};

exports.edit = function (req, res) {
	res.render('deployments/edit', {
		title: "编辑",
		deployment: req.deployment
	})
}

exports.remove = function(req, res){
	Deployment.remove(req.query, function(err){
		if(err) {
			res.send("There was a problem removing the information to the database.");
		} else {
			res.redirect("/");
		}
	});
};

exports.update = function(req, res) {
	var deployment = req.deployment;
	deployment = _.extend(deployment, req.body);
	deployment.save(function(err){
		if(err) {
			res.send("There was a problem adding the information to the database.");
		} else {
			res.redirect("/");
		}
	});
};
