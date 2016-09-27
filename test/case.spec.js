var assert = require('assert');

var fs = require('fs');
var path = require('path');

var marked = require('marked');

describe('parse', function () {

    var cmacc = require('../src/index');

    var convert = cmacc.convert;
    var resolve = cmacc.resolve;

    var run = function (file) {
        var ast = convert(file);

        console.log()
        var result = resolve(ast);
        return result;
    };

    describe('id', function () {
        it('should parse doc.cmacc', function (done) {
            var file = path.join(__dirname, 'case', './id/doc.cmacc');
                var result = run(file);
                assert.equal(result, "Name: Willem Veelenturf Willem Veelenturf");
                done();
        });

        it('should parse doc_overwrite.cmacc', function (done) {
            var file = path.join(__dirname, 'case', './id/doc_overwrite.cmacc');
            var result = run(file);
            assert.equal(result, "Name: Willem Veelenturf Veelenturf Willem 1234");
            done();

        });
    });

    describe('person_double_import', function () {
        it('should parse doc.cmacc', function (done) {
            var file = path.join(__dirname, 'case', './person_double_import/doc.cmacc');

            var result = run(file);

            assert.equal(result, "This agreement is between name_First name_Last and name_First name_Last.");
            done()

        });
    });

});