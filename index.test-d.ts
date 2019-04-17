import {expectType} from 'tsd';
import indentString = require('.');

expectType<string>(indentString('Unicorns\nRainbows'));
expectType<string>(indentString('Unicorns\nRainbows', 4));
expectType<string>(indentString('Unicorns\nRainbows', 4, {indent: '♥'}));
expectType<string>(
	indentString('Unicorns\nRainbows', 4, {includeEmptyLines: true})
);
