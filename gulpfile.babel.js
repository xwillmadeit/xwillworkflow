import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import { create } from 'browser-sync';
const browserSync = create();

gulp.task('scss', () => {
	gulp.src('src/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('build/css'))
		.pipe(browserSync.stream());
});

gulp.task('js', () => {
	gulp.src('src/js/*.js')
		.pipe(babel({presets: ['es2015']}))
		.pipe(gulp.dest('build/js'))
		.pipe(browserSync.stream());
});

gulp.task('default', () => {
	browserSync.init({
		server: {
			baseDir: './'
		},
		browser: "google chrome"
	});

	gulp.watch('src/scss/*.scss', ['scss']);
	gulp.watch('src/js/*.js', ['js']);
});