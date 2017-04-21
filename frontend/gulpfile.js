const gulp = require("gulp");
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const debug = require('gulp-debug');
const autoprefixer = require('gulp-autoprefixer');

const scssPath = ['app/**/*.scss', '*.scss'];

gulp.task('scss', function(){
	return gulp.src(scssPath, { since : gulp.lastRun('scss') })
		.pipe(sass({ linefeed : 'crlf' }).on('error', sass.logError))
		//.pipe(debug({ title : 'scss' }))
		.pipe(autoprefixer({ browsers: ['last 2 versions' ], cascade: true }))
		.pipe(gulp.dest(function(file){
	    return file.base;
		}));
});

gulp.task('watch', gulp.series('scss', function(done) {
	/*
	watch(scssPath, () => {
		gulp.start('scss');
	});
	*/
  gulp.watch(scssPath, gulp.series('scss'));
	done();
}));
