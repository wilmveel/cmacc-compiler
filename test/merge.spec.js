var assert = require('assert');
var merge = require('../src/merge');

describe('merge0', function () {
    it('flat', function () {
        var obj1 = {
            test1 : 'test1'
        };

        var obj2 = {
            test2 : 'test2'
        };

        var res = merge(obj1, obj2)

        assert.deepEqual(res, { test1: 'test1', test2: 'test2' });

    });

    it('deep', function () {
        var obj1 = {
            test1 : {
                hoi: 'test1'
            }
        };

        var obj2 = {
            test1 : {
                doei: 'test2'
            }
        };

        var res = merge(obj1, obj2)

        assert.deepEqual(res, { test1: { hoi: 'test1', doei: 'test2' } });
    });

    it('change', function () {
        var obj1 = {
            test1 : {
                hoi: 'test1'
            }
        };

        var obj2 = {
            test1 : {
                hoi: 'test2'
            }
        };

        var res = merge(obj1, obj2)
        assert.deepEqual(res, { test1: { hoi: 'test2' } });

        res.test1.hoi = 'test3';

        assert.deepEqual(res, { test1: { hoi: 'test3' } });
    });


    it('double', function () {
        var obj1 = {
            test1 : {
                hoi: 'test1'
            }
        };

        var obj2 = {
            test1 : {
                hoi: 'test2'
            }
        };

        var res = merge(obj1, obj2)
        assert.deepEqual(res, { test1: { hoi: 'test2' } });

        res.test1.hoi = 'test3';

        assert.deepEqual(res, { test1: { hoi: 'test3' } });
    });


    it('mix', function () {
        var obj1 = {
            str: '123',
            test1 : {
                hoi: 'test1'
            }
        };

        var obj2 = {
            test1 : {
                hoi: 'test2'
            }
        };

        var res = merge(obj1, obj2)
        assert.deepEqual(res, { str: '123', test1: { hoi: 'test2' } });

        res.test1.hoi = 'test3';

        assert.deepEqual(res, { str: '123', test1: { hoi: 'test3' } });
    });
});