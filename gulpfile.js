const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass')),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify-es').default,
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    webp = require('gulp-webp'),
    webpHTML = require('gulp-webp-html'),
    include = require('gulp-file-include'),
    minCSS = require('gulp-cssmin'),
    mediaGroup = require('gulp-group-css-media-queries'),
    purgecss = require('gulp-purgecss'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2');

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'dist/',
            notify: false,
        }
    })
}

function cleanDist() {
    return del('dist')

}

function images() {
    return src('app/img/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 90, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: false },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(dest('dist/img'))
}

function cleanWebp() {
    return del('app/img/**/*.webp')
}

function webpConvert() {
    return src('app/img/**/*', '!app/img/favicon/**/*.*')
        .pipe(webp({ quality: 60 }))
        .pipe(dest('app/img'))
}

function scripts() {
    return src('app/js/*.js')
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream())
}

function scriptsMin() {
    return src('app/js/main.js')
        .pipe(concat('main.min.js'))
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream())
}

function scriptsLib() {
    return src([
        'node_modules/mobile-detect/mobile-detect.min.js',
        'node_modules/swiper/swiper-bundle.min.js', // Слайдер
        'node_modules/chart.js/dist/chart.min.js', // График
        'node_modules/aos/dist/aos.js', // Анимация
        'node_modules/smoothscroll-polyfill/dist/smoothscroll.min.js', // Полифил для скрола

    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream())
}

function htmlCompilation() {
    return src(['app/*.html'])
        .pipe(include())
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

function htmlComponents() {
    return src('app/html-components/_*.html')
        .pipe(include())
        .pipe(htmlCompilation())
}

function htmlDel() {
    return del('dist/_*.html')
}

function styles() {
    return src('app/scss/style.scss')
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(mediaGroup())
        .pipe(minCSS())
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            grid: true
        }))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream())
}

function stylesIntro() {
    return src('app/scss/style-intro.scss')
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(mediaGroup())
        .pipe(minCSS())
        .pipe(concat('style-intro.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            grid: true
        }))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream())
}

function stylesAlt() {
    return src('app/scss/style.scss')
        .pipe(scss())
        .pipe(mediaGroup())
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(dest('dist/css'))
}

function CSSlibBuild() {
    return src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/swiper/swiper-bundle.min.css', // Слайдер
        'node_modules/aos/dist/aos.css', // Анимации

    ])
        .pipe(concat('_libs.scss'))
        .pipe(dest('app/scss'))
}

function ttf2woffConvert() {
    return src('app/fonts/*.ttf', '!app/fonts/icomoon.ttf')
        .pipe(ttf2woff())
        .pipe(dest('dist/css'))
}

function ttf2woff2Convert() {
    return src('app/fonts/*.ttf', '!app/fonts/icomoon.ttf')
        .pipe(ttf2woff2())
        .pipe(dest('dist/css'))
}

function fonts() {
    return src('app/fonts/*.ttf', 'app/css/*.woff', 'app/css/*.woff2', 'app/fonts/icomoon*')
        .pipe(dest('dist/css'))
}

function json() {
    return src('app/json/*.json')
        .pipe(dest('dist/json'))
}

function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], series(scripts, scriptsMin));
    watch(['app/json/*.json'], json);
    watch(['app/*.html'], htmlCompilation);
    watch(['app/html-components/_*.html'], htmlComponents);
}


function watching() {
    watch(['app/scss/**/*.scss'], series(styles, stylesIntro));
    watch(['app/js/**/*.js', '!app/js/main.min.js'], series(scripts, scriptsMin));
    watch(['app/json/*.json'], json);
    watch(['app/*.html'], htmlCompilation);
    watch(['app/html-components/_*.html'], htmlComponents);
}


exports.styles = styles
exports.stylesAlt = stylesAlt;
exports.stylesIntro = stylesIntro;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.scriptsLib = scriptsLib;
exports.scriptsMin = scriptsMin;
exports.images = images;
exports.cleanDist = cleanDist;
exports.CSSlibBuild = CSSlibBuild;
exports.ttf2woff2Convert = ttf2woff2Convert;
exports.webpConvert = webpConvert;
exports.fonts = fonts;
exports.htmlDel = htmlDel;
exports.htmlCompilation = htmlCompilation;
exports.htmlComponents = htmlComponents;


exports.fonts = series(ttf2woffConvert, ttf2woff2Convert, fonts);
exports.webp = series(cleanWebp, webpConvert);
exports.default = parallel(CSSlibBuild, styles, stylesIntro, browsersync, watching, scriptsLib, scripts, scriptsMin, htmlComponents, json);
