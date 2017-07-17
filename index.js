'use strict';
module.exports = (str, count, options) => {
	if (options === undefined) {
		options = {indent: ' ', blank: false};
	} else if (typeof options === 'object') {
		options.indent = options.indent === undefined ? ' ' : options.indent;
		options.blank = options.blank === undefined ? false : options.blank;
	} else {
		// Support older versions: use the third parameter as options.indent
		options = {indent: options, blank: false};
	}
	count = count === undefined ? 1 : count;

	if (typeof str !== 'string') {
		throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof str}\``);
	}

	if (typeof count !== 'number') {
		throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof count}\``);
	}

	if (typeof options !== 'object') {
		throw new TypeError(`Expected \`options\` to be a \`string\` or an \`object\`, got \`${typeof options}\``);
	}

	if (typeof options.indent !== 'string') {
		throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof options.indent}\``);
	}

	if (typeof options.blank !== 'boolean') {
		throw new TypeError(`Expected \`options.blank\` to be a \`boolean\`, got \`${typeof options.blank}\``);
	}

	if (count === 0) {
		return str;
	}

	const rx = options.blank ? /^/mg : /^(?!\s*$)/mg;
	return str.replace(rx, options.indent.repeat(count));
}
;
