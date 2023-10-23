module.exports = {
	globDirectory: 'src/',
	globPatterns: [
		'**/*.{jsx,svg,css,js}'
	],
	swDest: 'src/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};