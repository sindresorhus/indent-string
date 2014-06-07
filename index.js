'use strict';
var repeatString = require('repeat-string');

module.exports = function (str, indent, count) {
	if (typeof str !== 'string' || typeof indent !== 'string') {
		throw new TypeError('`string` and `indent` should be strings');
	}

	indent = parseInt(count) > 1 ? repeatString(indent, count) : indent;

	return str.replace(/(?:^|\r?\n)(?=[\S$])/g, '$&' + indent);
};
