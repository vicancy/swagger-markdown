/**
 * Make camel case format
*/
module.exports = input => input
  .replace(/\W+/g, '-')
  .replace(/\s+/g, '-')
  .replace(/^-*/ig, '')
  .replace(/-*$/ig, '')
  .toLowerCase();
