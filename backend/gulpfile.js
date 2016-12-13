let gulp = require('gulp'),
		ts = require('gulp-typescript'),
		sourcemaps = require('gulp-sourcemaps');

let tsProject = ts.createProject('tsconfig.json');

gulp.task('ts', () => {
	return gulp.src('app/**/*.ts')
						.pipe(sourcemaps.init())
						.pipe(tsProject())
						.pipe(sourcemaps.write('', {addComment: false}))
						.pipe(gulp.dest('dist/'));
});

gulp.task('watch', ['ts'], () => {
	gulp.watch('app/**/*.ts', ['ts']);
});
