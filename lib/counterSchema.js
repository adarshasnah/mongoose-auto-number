var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var counterSchema = new Schema({
    name: {
        type: String,
        lowercase: true,
        required: true,
        index: true
    },
    value: {
        type: Number,
        default: 1
    }
});

counterSchema.statics.getNextCount = function (id, callback) {

    var condition = {
        name: id
    };

    var update = {
        $inc: {
            value: 1
        }
    };

    var options = {
        new: true,
        upsert: true
    };

    this.findOneAndUpdate(condition, update, options, function (err, data) {

        if (err)
            callback(err);
        else
            callback(null, data.value);
    });

};

module.exports = counterSchema;