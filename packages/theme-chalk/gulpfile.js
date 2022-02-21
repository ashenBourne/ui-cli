'use strict';

const { series, src, dest } = require('gulp');
const sass = require('gulp-dart-sass');
// 将css文件中需要做兼容处理的地方，自动添加浏览器修饰前缀（例如：-webkit-, -ms-, -o-）
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');

function compile() {
    return src('./src/*.scss')
        .pipe(sass.sync().on('error', sass.logError))   //  转成css
        .pipe(autoprefixer({
            overrideBrowserslist: ['ie > 9', 'last 2 versions'],
            cascade: false
        })) // 进行css补全
        .pipe(cssmin()) //css压缩
        .pipe(dest('./lib'));   //输出
}

// 处理字体
function copyfont() {
    return src('./src/fonts/**')
        .pipe(cssmin())
        .pipe(dest('./lib/fonts'));
}

// 多任务将会依次执行
exports.build = series(compile, copyfont);
