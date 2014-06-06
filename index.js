'use strict';
var repeatString = require('repeat-string');

module.exports = function (str, indent, count) {
	if (typeof str !== 'string' || typeof indent !== 'string') {
		throw new TypeError('`string` and `indent` should be strings');
	}

	indent = count > 0 ? repeatString(indent, count) : indent;

	return str.replace(/(?:^|\r\n|\n)(?=[^\s$])/g, '$&' + indent);
};
