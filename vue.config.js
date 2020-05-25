// vue.config.js
const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];

console.log(process.env.NODE_ENV);

function addStyleResource(rule) {
	rule.use('style-resource')
		.loader('style-resources-loader')
		.options({
			patterns: [
				// path.resolve(__dirname, '@/style/base.less'), // 需要全局导入的less
			]
		});
}
module.exports = {

	chainWebpack: config => {
		const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
		types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))


		if (process.env.NODE_ENV === 'production') {

			// 打包分析
			// config
			// 	.plugin('webpack-bundle-analyzer')
			// 	.use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)

			// console.log("默认配置", config);

			//首页文件预加载
			config.plugins.delete('preload');
			config.plugins.delete('prefetch');
		}

	},

	configureWebpack: config => {

		// 生产环境

		if (process.env.NODE_ENV === 'production') {
			// gzip压缩
			// config.plugins.push(
			//     new CompressionWebpackPlugin({
			//         filename: '[path].gz[query]',
			//         algorithm: 'gzip',
			//         test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
			//         threshold: 10240,
			//         minRatio: 0.8
			//     })
			// );

			//去除console
			config.optimization.minimizer[0].options.terserOptions.compress.warnings = false;
			// config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
			config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
			// config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log'];
			// console.log(config)
		}
	},

	// 项目上线地址
	publicPath: process.env.NODE_ENV === 'production' ? '/api/' : '/',

	productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,

    devServer: {
        port: 8888, // 端口
    },

	//全局导入scss
	css: {
		// extract: false,
		loaderOptions: {
			less: {
				javascriptEnabled: true
			},
			sass: {
				data: `@import "@/style/base.scss";`
			}
		}
	},
    pages: {
		page1: {
			// 页面入口
			entry: 'src/pages/page1/main.js',
			// 页面模板
            template: 'src/pages/page1/page1.html',
			// build时输出的文件名
            filename: 'page1.html',
			// 当使用title选项时
			// template中的title标签需要是<title><%= htmlWebpackPlugin.options.title %></title>
			title: '首页',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'page1']
		},
        page2: {
            entry: 'src/pages/page2/main.js',
            template: 'src/pages/page2/page2.html',
            filename: 'page2.html',
            title: '',
            chunks: ['chunk-vendors', 'chunk-common', 'page2']
		}
	},
}