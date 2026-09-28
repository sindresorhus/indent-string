export default function indentString(string, count = 1, options = {}) {
	const {
		indent = ' ',
		includeEmptyLines = false,
	} = options;

	if (typeof string !== 'string') {
		throw new TypeError(
			`Expected \`input\` to be a \`string\`, got \`${typeof string}\``,
		);
	}

	if (typeof count !== 'number') {
		throw new TypeError(
			`Expected \`count\` to be a \`number\`, got \`${typeof count}\``,
		);
	}

	if (count < 0) {
		throw new RangeError(
			`Expected \`count\` to be at least 0, got \`${count}\``,
		);
	}

	if (typeof indent !== 'string') {
		throw new TypeError(
			`Expected \`options.indent\` to be a \`string\`, got \`${typeof indent}\``,
		);
	}

	if (count === 0) {
		return string;
	}

	const regex = includeEmptyLines ? /^/gmv : /^(?!\s*$)/gmv;

	// The indent is a replacement string, so a `$` sequence in it expands as a pattern instead
	// of being inserted literally. That is the published behavior, so it stays.
	// eslint-disable-next-line unicorn/no-unsafe-string-replacement
	return string.replace(regex, indent.repeat(count));
}
