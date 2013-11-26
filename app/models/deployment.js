var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeploymentSchema = new Schema({
    sn: String,
    region: String,
    address: String,
    installDate: String, //{type:Date, default:Date.now},
    qcDate: String, //{type:Date, default:Date.now},
    maintanceRecord: String,
    remark: String
});

DeploymentSchema.statics = {
	load: function (id, cb) {
		this.findOne({ _id : id }).exec(cb)
	},
	list: function (cb) {
		this.find()
			.sort({'sn' : 1})
			.exec(cb)
	}
}

exports.Deployment = mongoose.model('deploymentcollection', DeploymentSchema);