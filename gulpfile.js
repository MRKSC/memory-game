
// var or requests for functions
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps');
let cleanCSS = require('gulp-clean-css');

// first task to compile the sass (scss files) into css
gulp.task('styles', function () {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('app.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
        }))
        .pipe(gulp.dest('./css'));
});

//second task for concatenation js and minification js for dist version of web
gulp.task('scripts-dist',function () {
    gulp.src('js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))//spojenie suborov
        .pipe(uglify()) // minimalizacia suborov
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));
});

//third task for concatenation css and minification css for dist version of web
gulp.task('style-dist',function () {
    gulp.src('css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'));
});

// this is a watcher over a change in a scss files to compile automatically  after click
gulp.task('watch', function () {
    gulp.watch('./sass/*scss', ['styles']);

});

//browser-sync start --server --files "css/*.css"
//browser-sync start --proxy "myproject.dev" --files "css/*.csfrfghfgfs"


