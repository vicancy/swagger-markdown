const inArray = require('../lib/inArray');
const transformResponses = require('./pathResponses');
const transformParameters = require('./pathParameters');
const security = require('./security');
const anchor = require('../lib/anchor');
/**
 * Allowed methods
 * @type {string[]}
 */
const ALLOWED_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'options'];

module.exports = (path, data, parameters) => {
  const res = [];
  let pathParameters = null;

  if (path && data) {
    // Check if parameter for path are in the place
    if ('parameters' in data) {
      pathParameters = data.parameters;
    }

    // Go further method by methods
    Object.keys(data).map(method => {
      if (inArray(method, ALLOWED_METHODS)) {
        // Make summary as a header
        const pathInfo = data[method];
        const summary = pathInfo.summary || `${method} ${path}`;
        const name = anchor(`${method} ${summary}`);

        // add an anchor for each method
        res.push(`<a name="${name}"></a>`);
        res.push(`### ${summary}\n`);

        res.push(`\`${method.toUpperCase()} ${path}\``);

        // Set description
        if ('description' in pathInfo) {
          res.push(`##### Description:\n\n${pathInfo.description}\n`);
        }

        // Build parameters
        if ('parameters' in pathInfo || pathParameters) {
          res.push(`${transformParameters(pathInfo.parameters, pathParameters, parameters)}\n`);
        }

        // Build responses
        if ('responses' in pathInfo) {
          res.push(`${transformResponses(pathInfo.responses)}\n`);
        }

        // Build security
        if ('security' in pathInfo) {
          res.push(`${security(pathInfo.security)}\n`);
        }
      }
    });
  }
  return res.length ? res.join('\n') : null;
};
