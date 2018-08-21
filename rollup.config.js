// rollup.config.js
var rollup = require('rollup');
var babel = require('rollup-plugin-babel');
var uglify = require('rollup-plugin-uglify');
var resolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var json = require("rollup-plugin-json");
var serve = require("rollup-plugin-serve");
var livereload = require('rollup-plugin-livereload');

//监听服务器 ：rollup -c -w

export default {
	input: 'src/js-dev/app.js',

	/* 默认情况下，模块的上下文 - 即顶级的this的值为undefined。您可能需要将其更改为其他内容，如 'window'*/
	context: "window",
	plugins: [
	
		/*commonjs 转换 es6*/
		//			resolve(),
		//			commonjs(), 
		
		babel({
			exclude: ['node_modules/**'],
			presets: ["es2015-rollup"]
		}),
		//uglify(), // 使用uglify压缩js 不能output 输出 format: 'es' 格式 否会报错
		serve({
			contentBase: './src', //启动文件夹;
			host: 'localhost', //设置服务器;
			port: 8888 //端口号;
		}),
		livereload({
			watch: './src' //监听文件夹  更新页面;
		})

	],

	// sourceMap: true,
	output: [{
			format: 'umd',
			name: 'hqs',
			file: 'dist/js/mobile.js',
			indent: '\t',
			strict: false, //在生成的包中省略`"use strict";`
			//			globals: {
			//				jquery: '$',
			//				value:"$"
			//			}

		},
		//		{
		//			format: 'es',
		//			file: 'build/all.module.js',
		//			indent: '\t'
		//		}
	]
};