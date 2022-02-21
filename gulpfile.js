const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('style', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('style'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
});
gulp.task('html'.function() {
    return gulp.src("scr/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('script'.function() {
    return gulp.src("scr/js/**/*.js")
        .pipe(gulp.dest('dist/js'));
});

gulp.task('fonts'.function() {
    return gulp.src("scr/fonts/**/*")
        .pipe(gulp.dest('dist/js'));
});

gulp.task('icons'.function() {
    return gulp.src("scr/icons/**/*")
        .pipe(gulp.dest('dist/js'));
});

gulp.task('mailer'.function() {
    return gulp.src("scr/mailer/**/*")
        .pipe(gulp.dest('dist/js'));
});

gulp.task('img'.function() {
    return gulp.src("scr/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'style', 'script', 'fonts', 'mailer', 'icons', 'img'));