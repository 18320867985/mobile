//1. 全局安装 gulp： $ npm install --global gulp
//2. 作为项目的开发依赖（devDependencies）安装：$ npm install --save-dev gulp
//3. 在项目根目录下创建一个名为 gulpfile.js 的文件：var gulp = require('gulp');
//4. gulp.task('default', function() {
// 将你的默认的任务代码放在这
//});

var gulp = require('gulp');

var del = require("del");
var watch = require("gulp-watch");
var minJs = require('gulp-uglify'); //压缩javascript文件  npm install gulp-uglify
var connect = require('gulp-connect'); //gulp-connect 创建服务器  npm install --save-dev gulp-connect
var concat = require('gulp-concat'); //整合文件npm install --save-dev gulp-concat
var img = require('gulp-imagemin'); //gulp-imagemin:压缩png、jpj、git、svg格式图片 npm install --save-dev gulp-imagemin
var minHtml = require('gulp-htmlmin'); //使用gulp-htmlmin压缩html，可以压缩页面javascript、css，去除页面空格、注释，删除多余属性等操作
var rename = require("gulp-rename"); // gulp-rename 重命名文件，把一个文件储存不同版本时使用
var eslint = require("gulp-eslint"); // 检查es5 ees6 js gulp-eshint

/*
 * es6 转换 es5
 * $ npm install --save-dev gulp-babel babel-preset-env
 * $ npm install --save-dev gulp-babel babel-preset-es2015
 * 
 */
var babel = require("gulp-babel");

/*
 * src\node_contextify.cc:631: Assertion 'args[1]->IsString()' failed.
 * node 10 版本会出现这个问题, 安装natives后可以解决
使用命令 npm install natives

*/

// 文件路径
var htmlPath= ['./src/**/*.html'];
var jsPath=["./src/js-dev/mobile-1.0.0.js"

	];
	
var version="mobile-1.0.0.js";
var versionMin="mobile-1.0.0.min.js";



// 清空目录gulp-del
gulp.task('del', function(cd) {
	// gulp.src('./dist',{read:false}).pipe(clean()); //gulp-clean

	del(["./dist"], cd); //gulp-del
});



/******发布文件*******/

gulp.task('release', ['concat'], function() {

	//**是所以文件夹
	//*.*是所以文件
	//gulp.src是查找文件
	//pipe是进入流管道
	//gulp.dest() 是复制文件

	gulp.src(['./src/*.html']).pipe(gulp.dest('./dist/')); //复制html
	gulp.src('./src/css/**/*.*').pipe(gulp.dest('./dist/css'));  //复制css
	gulp.src('./src/js/**/*.*').pipe(gulp.dest('./dist/js/'));  //复制js
	gulp.src('./src/json/**/*.*').pipe(gulp.dest('./dist/json/')); //复制 json

});

// 发布的合并js和css文件
gulp.task("concat", ["build"]);


gulp.task("build", function() {

	// 合并js
return gulp.src(jsPath)
		.pipe(concat(version))
		.pipe(minJs()) //压缩js文件
		.pipe(gulp.dest('./src/js/'))
		
		//gulp.src(jsPath).pipe(minJs()).pipe(concat(versionMin)).pipe(gulp.dest('./src/js/'));


});



//开启http服务器
gulp.task('connect', function() {
	connect.server({
		root: 'src',
		livereload: true,
		port: 8888
	});
});


/*
 * watch监听
 * gulp.watch参数说明
 * 1. gulp.watch(path,task);
 * 2.gulp.watch(path,function(){});
 */
gulp.task("watch", ['connect'], function() {
	
	//监听js
	gulp.watch(jsPath, ["build"]);

	//监听html
	gulp.watch(htmlPath, function() {
		//重启服务器	
		gulp.src(paths.htmlPath).pipe(connect.reload());

	});

});




