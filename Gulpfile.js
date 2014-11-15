var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var minifyCSS = require('gulp-minify-css');
var browserify = require('browserify');
var transform = require('vinyl-transform');

var path = require('path');
var root = path.resolve(__dirname);
var assets = path.resolve(root, 'assets');
var vendor = path.resolve(assets, 'vendor');

// Default.
gulp.task('default', ['assetsApp', 'assetsAppReact', 'vendor']);

// Assets.
gulp.task('assetsApp', function() {
    return gulp.src(assets + '/app/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(root + '/web/js'));
});

// Assets.
gulp.task('assetsAppReact', function() {
    var browserified = transform(function(filename) {
        return browserify({
                entries: filename,
                insertGlobals: false,
                extensions: ['.js'],
                standalone: 'App'
            })
            .transform('reactify')
            .bundle();
    });

    return gulp.src(assets + '/app_react/app.js')
        .pipe(browserified)
        .pipe(concat('app_react.js'))
        .pipe(uglify())
        .pipe(gulp.dest(root + '/web/js'));
});

// Watch.
gulp.task('watch', ['assetsApp', 'assetsAppReact'], function() {
    gulp.watch(assets + '/app/*.js', ['assetsApp']);
    gulp.watch(assets + '/app_react/**/*.js', ['assetsAppReact']);
});

// Vendor.
gulp.task('vendor', ['vendorJS', 'vendorCSS']);

// Vendor.
gulp.task('vendorJS', function() {
    return gulp
        .src([
            vendor + '/jquery/dist/jquery.js',
            vendor + '/URIjs/src/URI.js',
            vendor + '/angular/angular.js',
            vendor + '/angular-sanitize/angular-sanitize.js'
        ])
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest(root + '/web/js'));
});

// Vendor.
gulp.task('vendorCSS', function() {
    return gulp
        .src([
            vendor + '/bootstrap/dist/css/bootstrap.css'
        ])
        .pipe(concat('vendor.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(root + '/web/css'));
});

// Run jshint.
gulp.task('hint', function() {
    return gulp.src([root + '/Gulpfile.js', assets + '/app/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});
