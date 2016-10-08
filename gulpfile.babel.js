import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import autoprefixer from 'gulp-autoprefixer';
import cleancss from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import { create } from 'browser-sync';
const browserSync = create();

gulp.task('scss', () => {
	gulp.src('src/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.init())
		.pipe(autoprefixer({
			browsers: 'last 4 versions'
		}))
		.pipe(concat('app.css'))
		.pipe(cleancss())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('build/css'))
		.pipe(browserSync.stream());
});

gulp.task('js', () => {
	gulp.src('src/js/*.js')
		.pipe(babel({presets: ['es2015']}))
		.on('error', (err) => { console.log(err.toString()) })
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
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
	gulp.watch('index.html', browserSync.reload);
});