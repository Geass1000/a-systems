const gulp = require("gulp");
const spawn = require('child_process').spawn;
let node;

gulp.task('server', function(done) {
  if (node) node.kill();
  node = spawn('node', ['./app/index.js'], {stdio: 'inherit'});
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
	done();
});

gulp.task('watch', gulp.series('server', function(done) {
  gulp.watch(['./app/**/*.js', './app/**/**/*.js'], gulp.series('server'));
	done();
}));

process.on('exit', function() {
    if (node) node.kill();
});
