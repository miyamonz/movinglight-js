import gulp from 'gulp'
import gplugins from 'gulp-load-plugins'
const $ = gplugins();

gulp.task('test', () => {
    gulp.src(["./test/*"])
        .pipe($.plumber())
        .pipe($.mocha({reporter:"spec"}))

})

gulp.task("watch", () => {
    gulp.watch( ["./fixture/**/*","./test/**/*","./app/**/*", "./util/**/*"], ["test"])
})

gulp.task("default", () =>
        console.log("default"))

