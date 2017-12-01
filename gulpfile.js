const 	gulp = require('gulp'),
		imagemin = require('gulp-imagemin'),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		rename = require("gulp-rename"),
		includer = require('gulp-htmlincluder'),
		replace = require('gulp-html-replace'),
		//babel = require('gulp-babel'),
		browserSync = require('browser-sync'),
		csscomb = require('gulp-csscomb');
		
gulp.task('browser-sync', function(){
    browserSync({
        server: {
            baseDir: 'build'
        }
    });
});	

gulp.task('lib', function () {
    gulp.src('dev/lib/**/*.*')
        .pipe(gulp.dest('build/lib/'))
        .pipe(browserSync.stream());
});

gulp.task('image', function () {
    return gulp.src('dev/img/**/*')
        .pipe(gulp.dest('build/img'))
		.pipe(browserSync.stream());
});

gulp.task('fonts', function() {
    return gulp.src('dev/fonts/**/*')
        .pipe(gulp.dest('build/fonts'))
		.pipe(browserSync.stream());
});	
		
		
gulp.task('css', function () {
    gulp.src('dev/sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ 
			cascade: false,
			browsers: "last 50 versions"			
		}))
        .pipe(rename('style.min.css'))
	    .pipe(csscomb())
        .pipe(gulp.dest('build/css/'))
        .pipe(browserSync.stream());
});

gulp.task('html', function () {
    gulp.src('dev/**/*.html')
        .pipe(includer())
        .pipe(replace({
            css: 'css/style.min.css',
            js: 'js/common.min.js'
        }))
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.stream());
});

gulp.task('imagemin', function () {
    return gulp.src(['dev/img/**/*.jpg', 'dev/img/**/*.png'])
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    gulp.src('dev/js/common.js')
	//	.pipe(babel({
   //         presets: ['env']
  //      }))
        .pipe(rename('common.min.js'))
        .pipe(gulp.dest('build/js/'))
        .pipe(browserSync.stream());
});

gulp.task('default', function () {
    gulp.start('css',    'lib', 'html', 'js', 'browser-sync');

    gulp.watch(['dev/sass/*.*'], function () {
        gulp.start('css');
    });
    gulp.watch(['dev/**/*.html'], function () {
        gulp.start('html');
    });
    gulp.watch(['dev/js/*.js'], function () {
        gulp.start('js');
    });
    gulp.watch(['dev/img/**/*.*'], function () {
        gulp.start('imagemin');
    });
        gulp.watch(['dev/fonts/**/*.*'], function(){
            gulp.start('fonts');
        });

    gulp.watch(['dev/lib/**/*.*'], function () {
        gulp.start('lib');
    });
});