var outputPath = './dist/';

var scriptsToLoad = [
    'src/scripts/main.js'
];

// Load plugins
var gulp = require('gulp'),
    bower = require('gulp-bower'),
    compass = require('gulp-compass'),
    jade = require('gulp-jade'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    del = require('del'),
    webserver = require('gulp-webserver');

// Styles
gulp.task('styles', function () {
    return gulp.src('src/styles/main.scss')
        .pipe(compass({
            sass: 'src/styles',
            image: 'src/images',
            css: outputPath + 'css'
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(outputPath + 'css'))
        .pipe(notify({message: 'Styles compiled'}));
});

// Scripts
gulp.task('scripts', function () {
    return gulp.src( scriptsToLoad )
        .pipe(concat('main.js'))
        .pipe(gulp.dest(outputPath + 'js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(outputPath + 'js'))
        .pipe(notify({message: 'Scripts compiled'}));
});

// Images
gulp.task('images', function () {
    return gulp.src('src/images/**/*')
        .pipe(gulp.dest(outputPath + 'img'))
        .pipe(notify({message: 'Images compiled'}));
});

// Templates
gulp.task('htmlTemplates', function () {
    return gulp.src('src/templates/*.html')
        .pipe(gulp.dest(outputPath))
        .pipe(notify({message: 'Html templates compiled'}));
});

gulp.task('jadeTemplates', function() {
    gulp.src('src/templates/*.jade')
        .pipe(jade())
        .pipe(gulp.dest(outputPath))
        .pipe(notify({message: 'Jade templates compiled'}));
});

// Webserver with auto reload
gulp.task('webserver', function() {
    gulp.src( outputPath )
        .pipe(webserver({
            host:             'localhost',
            port:             '8001',
            livereload:       true,
            directoryListing: false,
            open: true
        }))
        .pipe(notify({message: 'Webserver is working'}));
});

// Clean
gulp.task('clean', function (cb) {
    del([outputPath + 'css', outputPath + 'js', outputPath + 'img', outputPath + '*.html'], { force: true }, cb)
});

// Bower
gulp.task('bower', function() {
    return bower();
});

// Default task
gulp.task('default', ['clean', 'bower'], function () {
    gulp.start('styles', 'scripts', 'images', 'htmlTemplates', 'jadeTemplates');
});

// Watch
gulp.task('watch', function () {

    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('src/images/**/*', ['images']);
    gulp.watch('src/templates/*.html', ['htmlTemplates']);
    gulp.watch(['src/templates/*.jade', 'src/templates/**/*.jade'], ['jadeTemplates']);

    gulp.run('webserver');

});