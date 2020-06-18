const { src, dest, series, parallel, watch } = require("gulp");
const del = require("del"),
    gulp = require("gulp"),
    postcss = require("gulp-postcss"),
    postcssPresetEnv = require("postcss-preset-env"),
    dev = "lib",
    postcssCustomMedia = require("postcss-custom-media"),
    autoprefixer = require("autoprefixer"),
    gutil = require("gulp-util"),
    sourcemaps = require("gulp-sourcemaps"),
    partials = require("postcss-partial-import"),
    browserSync = require("browser-sync").create();

//const browserSync = require('browser-sync').create();

async function clean(cb) {
    await del("/style.css", "/style.css.map");
    cb();
}

function css(cb) {
    src(`${dev}/style.css`)
        .pipe(sourcemaps.init())
        .pipe(
            postcss([
                partials({ prefix: "_", extension: ".css" }),
                postcssPresetEnv({ stage: 0 }),
                postcssCustomMedia(),
            ])
        )
        .on("error", gutil.log)
        .pipe(sourcemaps.write("."))

        .pipe(dest("./"));

    cb();
}

function watcher(cb) {
    watch(`${dev}/*.css`).on("change", series(css, browserSync.reload));
    cb();
}

function server(cb) {
    browserSync.init({
        notify: false,
        open: false,
        server: {
            baseDir: "./",
        },
    });
    cb();
}

exports.default = series(clean, css, server, watcher);
