var gulp = require("gulp"),
		watch = require('gulp-watch'),
		sass = require('gulp-sass');

var scssPath = ['app/**/*.scss', '*.scss'];

gulp.task('scss', function(){
	return gulp.src(scssPath)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(function(file){
	    return file.base;
		}));
});

gulp.task('watch', ['scss'], function() {
	watch(scssPath, () => {
		gulp.start('scss');
	});
  //gulp.watch(scssPath, ['scss']);
});
