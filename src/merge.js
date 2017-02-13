function merge(obj1, obj2) {

    for (var i in obj2) {

        obj1[i] = obj1[i] || {};

        if (typeof obj2[i] === 'object' && obj2[i] && (obj2[i].$$text$$ || typeof obj2[i].$$text$$ === 'string')) {
            obj1[i] = obj2[i];
        }

        if (typeof obj2[i] === 'object' && obj2[i] && (obj2[i].$$str$$ || typeof obj2[i].$$str$$ === 'string')) {
            obj1[i].$$str$$ = obj2[i].$$str$$;
            obj1[i].$$obj$$ = obj2[i].$$obj$$;
        }

        if (typeof obj2[i] === 'object' && obj2[i] && typeof obj2[i].$$str$$ !== 'string') {
            merge(obj1[i], obj2[i]);
        }
    }

    return obj1

}

module.exports = merge;
