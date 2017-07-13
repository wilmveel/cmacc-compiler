const merge = require('./merge');

function reduce(ast) {

  const vars = ast.vars.reduce((acc, x) => {

    if (x.data && x.data.type === 'cmacc')
      acc[x.name] = reduce(x.data);

    else {
      const split = x.name.split('.');
      const last = split.pop();
      const val = split.reduce((acc, val) => acc[val], acc);

      if (x.data && (x.data.type === 'json' || x.data.type === 'js')) {
        x = x.data;
      }

      if (x.type !== 'variable') {
        val[last] = x.data;
      }

    }

    return acc;

  }, {});

  if (ast.type === 'schema' || ast.type === 'js')
    vars['$schema$'] = ast.data;

  vars['$file$'] = ast.file;
  vars['$md$'] = ast.md;
  vars['$meta$'] = ast.meta;
  vars['$type$'] = ast.type;
  vars['$value$'] = ast.value;
  vars['$name$'] = ast.name;

  return vars;

}

module.exports = reduce;
