var gulp = require("gulp"),
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
  gulp.watch(scssPath, ['scss']);
});
