var gulp=require('gulp'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

var proxyMiddleware = require('http-proxy-middleware');
var concat=require('gulp-concat');
var uglify=require('gulp-uglify');
var rename=require('gulp-rename');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin'); //压缩图片
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var htmlmin = require('gulp-htmlmin');
var gulpif = require('gulp-if');
var del = require('del');

const pathConfig={
    "css": {
        "src": ["app/styles/*.css", "public/stylesheets/**/*.css"],
        "dist": "dist/styles/"
    },
    "images": {
        "src": "app/images/**/*",
        "dist": "dist/images/"
    },
    'fonts':{
    	"src":'app/fonts/**/*',
    	"dist":"dist/fonts/"
    },
    "js": {
        "src": ["app/scripts/*.js","app/scripts/**/*.js"],
        "dist": "dist/scripts/"
    },
    'html':{
    	"src": "app/admin.html",
    	"dist": "dist/"
    },
    "tpl":{
    	"src":['app/views/*.html','app/views/**/*.html'],
    	"dist": "dist/views/"
    }
}


//图片
gulp.task('images', function () {
return gulp.src(pathConfig.images.src)
    .pipe(cache(imagemin({
        progressive: true,
        interlaced: true
    })))
    .pipe(gulp.dest(pathConfig.images.dist));
});

//字体
gulp.task('fonts', function () {
//return gulp.src(require('main-bower-files')().concat(
//	['bower_components/bootstrap/fonts/**/*',
//	 'bower_components/font-awesome/fonts/**/*',
//	 'app/fonts'
//	]))
//  .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2,otf}'))
//  .pipe($.flatten())
//  .pipe(gulp.dest('dist/fonts'));
	return gulp.src(pathConfig.fonts.src)
		.pipe(gulp.dest(pathConfig.fonts.dist))


});

//字体
gulp.task('ue', function () {
	return gulp.src('app/ueditor/**/*')
		.pipe(gulp.dest('dist/ueditor'))


});




//压缩css
gulp.task('Cssmain',function(){	
    return gulp.src(pathConfig.css.src)         
     	.pipe(minifyCss())
        .pipe(gulp.dest(pathConfig.css.dist))
});

//压缩js
gulp.task('Jsmain',function(){	
    return gulp.src(pathConfig.js.src)         
     	.pipe(uglify())
        .pipe(gulp.dest(pathConfig.js.dist))
});

//提取html页面的js,css文件进行处理
gulp.task('html', function () {
    return gulp.src(pathConfig.html.src)
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest(pathConfig.html.dist));
});

//模板视图 views
gulp.task('tpl', function () {
  return gulp.src(pathConfig.tpl.src)
  		.pipe(htmlmin({
  			removeComments: true,//清除HTML注释
        	collapseWhitespace: true,//压缩HTML
        	collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
	        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
	        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
	        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
  		}))
  		.pipe(gulp.dest(pathConfig.tpl.dist))
});


gulp.task('clean', function () {
  	return del.bind(null, ['.tmp', 'dist/*']);
});



gulp.task('build',['ue','fonts','images','html','tpl'],function(){
	console.log('build success');
})

//开发运行
gulp.task('server',function() {
    var files = [
        './app/*',
        './app/views/**/*.html',
        './app/scripts/**/*.js',
        './app/styles/*.css',
    ];
    var middleware = proxyMiddleware(['/api','/admin_login','/admin_regist','/admin/loadData'], {target: 'http://localhost:7893/', changeOrigin: true});
    browserSync.init({	
        browser: 'chrome',
        notify: true,
        port: 9191,
        server: {
            baseDir: "./app",
            index:'admin.html',
            routes: {
		        '/libs': 'libs'
		    },
            middleware: middleware
        },
       
    });

    gulp.watch(files).on("change", reload); 
});

//线上运行
gulp.task('default', ['clean'], function () {
  	gulp.start('build');
});
