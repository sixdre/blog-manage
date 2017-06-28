var gulp=require('gulp'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;
var $ = require('gulp-load-plugins')();
var proxyMiddleware = require('http-proxy-middleware');
var concat=require('gulp-concat');
var uglify=require('gulp-uglify');
var rename=require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var htmlmin = require('gulp-htmlmin');
var gulpif = require('gulp-if');
var del = require('del');

var appConfig={
    appPath:'app/', //配置源文件路径
    dist:'dist/',//配置打包输出路径
    isDebug:true//配置编译方式
};

var paths={
	js:[
		appConfig.appPath+'scripts/*.js',
		appConfig.appPath+'scripts/**/*.js'
	],
	css:[
		appConfig.appPath+'styles/*.css'
	],
	html:[
		appConfig.appPath+'index.html'
	]
}


//图片
//gulp.task('images', function () {
//return gulp.src('app/images/**/*')
//  .pipe($.cache($.imagemin({
//    progressive: true,
//    interlaced: true
//  })))
//  .pipe(gulp.dest('dist/images'));
//});

//字体
//gulp.task('fonts', function () {
//return gulp.src(require('main-bower-files')().concat(
//	['bower_components/bootstrap/fonts/**/*',
//	 'bower_components/font-awesome/fonts/**/*'
//	]))
//  .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2,otf}'))
//  .pipe($.flatten())
//  .pipe(gulp.dest('dist/fonts'));
//});

gulp.task('clean', function () {
  del.bind(null, ['.tmp', 'dist/*']);
});

//压缩css
gulp.task('Cssmain',function(){	
    return gulp.src(paths.css)         
     	.pipe(minifyCss())
        .pipe(gulp.dest('dist/styles'))
});

//压缩js
gulp.task('Jsmain',function(){	
    return gulp.src(paths.js)         
     	.pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
});
//提取html页面的js,css文件进行处理
gulp.task('html', function () {
    return gulp.src(paths.html)
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});

//模板 views
gulp.task('tpl', function () {
  return gulp.src(['app/views/*.html','app/views/**/*.html'])
  		.pipe(gulp.dest('dist/views'))
});


gulp.task('build',['Jsmain','Cssmain','html','tpl'],function(){
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
            index:'',
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
