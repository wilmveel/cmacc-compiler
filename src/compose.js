var url = require('url');
var path = require('path');
var async = require('async');
var resolveUrl = require("resolve-url")

var helper = require('./helper');
var parser = require('./parser');
var resolve = require('./resolve');

var compose = function (file, parent, options, callback) {

    if(!callback)
        callback = options;

    options = options || {};
    options.path = options.path || path.dirname(file) + '/';

    parser(file, function (err, ast) {

        if (err)
            return callback(err);

        var variables = [];
        ast.variables.forEach(function (item, i) {
            if(parent) {
                var inject = helper.queryAst(parent, item.key)
                if (inject) {
                    variables.push(inject);
                }
                else {
                    variables.push(item);
                }
            }else{
                variables.push(item);
            }
        });

        if(parent) {
            parent.file = ast.file;
            parent.src = ast.src;
            parent.text = ast.text;
            parent.variables = variables;
            ast = parent;
        }

        var exec = [];
        ast.variables.forEach(function (item, i) {
            exec.push(function (callback) {
                if(!ast.variables[i].type){
                    resolve(ast.variables[i], ast, function (err, data) {

                        if (err)
                            return callback(err);

                        if (ast.variables[i].ref && !ast.variables[i].src) {
                            var location = resolveUrl(options.path, ast.variables[i].ref)
                            compose(location, ast.variables[i], function (err, res) {
                                if (err)
                                    return callback(err);
                                callback();
                            });
                        } else {
                            callback();
                        }
                    });
                }else {
                    callback();
                }

            });
        });

        async.series(exec, function (err, variables) {
            callback(err, ast);
        });

    });

}

module.exports = compose;