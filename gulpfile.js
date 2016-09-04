var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();

gulp.task('scss', function(){
	gulp.src('src/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('build/css'))
		.pipe(browserSync.stream());
});

gulp.task('js', function(){
	gulp.src('src/js/*.js')
		.pipe(babel({presets: ['es2015']}))
		.pipe(gulp.dest('build/js'))
		.pipe(browserSync.stream());
});

gulp.task('default', function(){
	browserSync.init({
		server: {
			baseDir: './'
		}
	})

	gulp.watch('src/scss/*.scss', ['scss']);
	gulp.watch('src/js/*.js', ['js']);
});