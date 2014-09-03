'use strict';
var repeatString = require('repeat-string');

module.exports = function (str, indent, count) {
	if (typeof str !== 'string' || typeof indent !== 'string') {
		throw new TypeError('`string` and `indent` should be strings');
	}

	if (count != null && typeof count !== 'number') {
		throw new TypeError('`count` should be a number');
	}

	indent = count > 1 ? repeatString(indent, count) : indent;

	return str.replace(/^(?!\s*$)/mg, indent);
};
