const gulp = require("gulp");
const sass = require('gulp-sass');
const debug = require('gulp-debug');
const gulpIgnore  = require('gulp-ignore');
const autoprefixer = require('gulp-autoprefixer');

const scssPath = ['src/assets/scss/*.scss'];

var condition = function (file) {
  return file.basename !== 'styles.scss';
}

gulp.task('scss', function(){
	return gulp.src(scssPath)
		.pipe(gulpIgnore.exclude('!styles.scss'))
		.pipe(sass({ linefeed : 'crlf' }).on('error', sass.logError))
		.pipe(autoprefixer({ browsers: ['last 2 versions' ], cascade: true }))
		.pipe(gulp.dest(function(file){
	    return file.base;
		}));
});

gulp.task('watch', gulp.series('scss', function(done) {
  gulp.watch(scssPath, gulp.series('scss'));
	done();
}));
