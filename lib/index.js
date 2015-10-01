var async = require('async');
var counterSchema = require('./counterSchema');

var init = function (db) {
    db.model('_Counter', counterSchema);
};

var plugin = function (schema, model) {

    var pathsToAutoIncrement = [];

    schema.eachPath(function (pathname, schemaType) {

        if (schemaType.options && schemaType.options.autoIncrement) {
            pathsToAutoIncrement.push(pathname);
        }
    });

    schema.pre('save', function (next) {

        var ins = this;

        var fieldToUpdate = [];

        for (var x = 0; x < pathsToAutoIncrement.length; x++) {
            if (!ins[pathsToAutoIncrement[x]])
                fieldToUpdate.push(pathsToAutoIncrement[x]);
        }

        var Counter = this.model('_Counter');

        async.each(
            fieldToUpdate,
            function (item, callback) {

                var name = model + '.' + item;

                Counter.getNextCount(name, function (err, count) {
                    ins[item] = count;

                    callback(err);
                });

            },
            function (err) {
                next();
            });

    });

};


module.exports = {
    init: init,
    plugin: plugin
};