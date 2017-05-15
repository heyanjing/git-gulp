var gulp = require('gulp'),
    sequence = require('gulp-sequence'),//顺序执行
    minifycss = require('gulp-minify-css'),
    cleancss = require('gulp-clean-css'),
    jshint = require("gulp-jshint"),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),//图片压缩
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    pngcrush = require('imagemin-pngcrush'),
    del = require('del');
var DIST = './dist', RES = './src';
var RES_CSS = RES + '/css/**/*.css', RES_JS = RES + '/js/**/*.js', RES_IMG = RES + '/img/**',RES_PLUGINS_JS=RES+'/plugins/**/*.js',RES_PLUGINS_CSS=RES+'/plugins/**/*.css';
var DISTCSS = DIST + '/css', DISTJS = DIST + '/js', DISTIMG = DIST + '/img',DISPLUGINS=DIST+'/plugins';


gulp.task('clean', function (cb) {
    return del(DIST, cb);
});
gulp.task('css', function () {
    return gulp.src(RES_CSS)      //压缩的文件
        .pipe(concat('mainx.css'))
        .pipe(rename({suffix: '.min'}))
        // .pipe(minifycss())//执行压缩
        .pipe(cleancss({compatibility: 'ie8'}))//执行压缩
        .pipe(gulp.dest(DISTCSS));

});
gulp.task("checkjs", function () {
    gulp.src(RES_PLUGINS_JS)
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
});
gulp.task('js', function () {
    return gulp.src(RES_JS)
        .pipe(concat('mainx.js'))    //合并所有js到main.js
        .pipe(gulp.dest(DISTJS))    //输出main.js到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())//执行压缩
        .pipe(gulp.dest(DISTJS));//输出
});
gulp.task('pluginjs',function () {
    return gulp.src(RES_PLUGINS_JS)
        .pipe(concat('plugin.js'))    //合并所有js到main.js
        .pipe(gulp.dest(DISPLUGINS))    //输出main.js到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())//执行压缩
        .pipe(gulp.dest(DISPLUGINS));//输出
});
gulp.task('plugincss', function () {
    return gulp.src(RES_PLUGINS_CSS)      //压缩的文件
        .pipe(concat('plugin.css'))
        .pipe(gulp.dest(DISPLUGINS))
        .pipe(rename({suffix: '.min'}))
        // .pipe(minifycss())//执行压缩
        .pipe(cleancss({compatibility: 'ie8'}))//执行压缩
        .pipe(gulp.dest(DISPLUGINS));

});
gulp.task('img', function () {
    return gulp.src(RES_IMG)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest(DISTIMG));
});
/**
 *顺序执行任务1
 *
 gulp.task('prod', function (cb) {
    sequence('clean', 'compass', ['image', 'style', 'html'], 'ftp')(cb);
});
 */
/**
 *顺序执行任务2
 *series里的任务是顺序执行的，parallel里的任务是同时执行的，最后执行ftp
 gulp.task('prod', gulp.series('clean', 'compass', gulp.parallel('image', 'style', 'html'), 'ftp'));
 */


gulp.task('one', function () {
    console.log('one');
});
gulp.task('two', function () {
    console.log('two');
});
gulp.task('three', function () {
    console.log('three');
});
gulp.task('four', function () {
    console.log('four');
});
gulp.task('five', function () {
    console.log('five');
});
gulp.task('start', function () {
    console.log("********************************************开始执行任务**************************************************************");
});
gulp.task('sque',sequence('start','clean', ['pluginjs','plugincss']));

gulp.task('default',['sque'],function (cb) {
    console.log("********************************************任务结束**************************************************************");
});

// gulp.task('default', ['clean'], function (cb) {
    // gulp.start('js', 'css', 'img');
    // gulp.watch(RESCSS, ['css']);
    // gulp.watch(RES_JS, ['js']);
    // gulp.watch(RES_IMG, ['img']);
    // gulp.start('one', 'two');
// });