var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('reload', function () {
	browserSync.reload();
});

gulp.task('serve', ['sass'], function () {
	browserSync({
		server: {
			index: 'index.html'
		}
	});

	gulp.watch('*.html', ['reload']);
	gulp.watch('sass/**/*.scss', ['sass']);
});


gulp.task('sass', function () {
	return gulp.src('sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', sass.logError))

		.pipe(autoprefixer({
			browsers: ['last 3 versions']
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
