const anchor = require('../lib/anchor');
const inArray = require('../lib/inArray');
const ALLOWED_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'options'];

function addRow(path, data) {
  const res = [];
  Object.keys(data).map(method => {
    if (inArray(method, ALLOWED_METHODS)) {
      const line = [];
      const pathInfo = data[method];
      const summary = pathInfo.summary || `${method} ${path}`;
      const name = anchor(`${method} ${summary}`);
      const link = `#${name}`;
      line.push(`[${summary}](${link})`);
      line.push(`\`${method.toUpperCase()} ${path}\``);
      res.push(`|${line.map(el => ` ${el} `).join('|')}|`);
    }
  });

  return res;
}

module.exports = (paths) => {
  let res = [];
  res.push('### Available APIs\n');
  res.push('| API | Path |');
  res.push('| ---- | ---------- | ');

  Object.keys(paths).forEach(path => {
    res = res.concat(addRow(path, paths[path]));
  });

  return res.join('\n');
};
