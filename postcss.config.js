module.exports = {
	plugins: {
		autoprefixer: {},
		'postcss-pxtorem': {
			rootValue: 72,
			propList: ['*'],
			minPixelValue: 2,
			mediaQuery: false,
			selectorBlackList: ['ignore-class']
		}
	}
}