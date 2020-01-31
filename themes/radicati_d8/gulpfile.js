/*jshint esversion: 6 */

const gulp = require("gulp"),
  sass = require("gulp-sass"),
  sassGlob = require("gulp-sass-glob"),
  jsonToSass = require("gulp-json-data-to-sass"),
  notify = require("gulp-notify"),
  nnotify = require("node-notifier"),
  concat = require("gulp-concat-util"),
  removeCode = require("gulp-remove-code"),
  rename = require("gulp-rename"),
  sourcemaps = require("gulp-sourcemaps"),
  browserSync = require("browser-sync").create(),
  minify = require("gulp-minify"),
  autoprefixer = require("gulp-autoprefixer"),
  fs = require("fs");

const { spawn } = require('child_process');

var config = {
  assetPath: "./assets",
  distPath: "./dist",
  patternsBasePath: "./patterns/_patterns",
  patternsDistPath: "./patterns/",
  plabPublicPath: "./.pattern-lab/public",
  filesPath: "../../../sites/default/files/",
  drupalTemplates: "./templates",
  themeRoot: './',
  siteBaseDir: "../../../.."
};

// var config = {
//   assetPath: "./assets",
//   distPath: "./dist",
//   patternsBasePath: "./patterns/_patterns",
//   patternsDistPath: "./patterns/",
//   plabPublicPath: "./.pattern-lab/public"
// };


// Change the default localServerUrl to match the current project!
if (fs.existsSync("./gulpfile.local.json")) {
  config = Object.assign(config, require("./gulpfile.local.json"));
} else {
  config.localServerUrl = "aclunc-d8.localhost";
}


/**
 * Browsersync reload function that announces it's done
 * so the sync function doesn't hang
 */
function browserSyncReload(done) {
  browserSync.reload();
  done();
}


/**
 * Clear Drupal cache
 */
function clearcache() {
  return spawn('drush', ['cache-rebuild'], {stdio: 'inherit'});

  // return cp.spawn("bundle", ["exec", "jekyll", "build"], { stdio: "inherit" });
};


/**
 * Generate pattern library
 */
function plGenerate(done) {
  const cmd = spawn("php", [".pattern-lab/core/console", "--generate"]);

  cmd.stdout.on("data", data => {
    console.log(data.toString());
  });

  cmd.stderr.on("data", data => {
    nnotify.notify({
      title: "Pattern Library Error",
      message:
        "Compiling Pattern Library Failed, check your terminal for error output."
    });
    console.log(data.toString());
  });
  // done();

  cmd.on("exit", function(code, signal) {
    console.log(
      "spawn process exited with " + `code ${code} and signal ${signal}`
    );
    done();
  });
}


/**
 * Import the fontello config.json
 */

function importJson() {
  return gulp
    .src(config.patternsBasePath + "/10-atoms/15-icon/config.json")
    .pipe(
      jsonToSass({
        sass: config.patternsBasePath + "/10-atoms/15-icon/fontello-variables.scss",
        prefix: 'fontello',
        suffix: '',
        separator: '-'
      })
    );
}

/**
 * Copy font files from pattern library to site dist
 */

function copyFonts() {
  return gulp
    .src(config.patternsDistPath + "/fonts/*")
    .pipe(gulp.dest(config.distPath + "/fonts"));
}


/**
 * Compile pattern library scss
 */
function css() {
  return (
    gulp
      .src(config.patternsBasePath + "/hip-styles.scss")
      .pipe(
        sassGlob({
          ignorePaths: [
            "**/_!*",
            "**/_!*/**"
          ]
        })
      )
      //.pipe(sourcemaps.init())
      .pipe(
        sass({
          includePaths: [config.patternsBasePath],
          outputStyle: "compressed"
        }).on("error", sass.logError)
      )
      //.pipe(sourcemaps.write())
      .pipe(autoprefixer())
      .pipe(gulp.dest(config.distPath + "/css"))
      .pipe(gulp.dest(config.patternsDistPath + "/css"))
      .pipe(gulp.dest(config.plabPublicPath + "/css"))
      .pipe(browserSync.stream({ match: "**/*.css" }))
  );
}


/**
 * Compile custom Drupal admin theme scss
 * I'm not sure where this scss file will be living
 * in our new theme, so I need to comment this out
 * for now...
 */
function drupalCss(done) {
  // return (
  //   gulp
  //     .src([
  //       config.patternsBasePath + "/adminimal-custom.scss",
  //       config.patternsBasePath + "/admin-styles.scss"
  //       ]
  //     )
  //     .pipe(sassGlob())
  //     //.pipe(sourcemaps.init())
  //     .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
  //     //.pipe(sourcemaps.write())
  //     .pipe(autoprefixer())
  //     .pipe(gulp.dest(config.distPath + "/css"))
  //     .pipe(gulp.dest(config.filesPath))
  // );

  // If I'm commenting everything out, I need to explicitly return something from this function or my process hangs!
  done();
};


/**
 * Compile WYSIWYG scss
 *
 * Again, not sure what's up with this in ACLUNC,
 * so I'm disabling the contents of this function
 * until I know what the file structure/process
 * is going to be...
 */
function wysiwyg(done) {
  // return (
  //   gulp
  //     .src(config.patternsBasePath + "/wysiwyg.scss")
  //     .pipe(sassGlob())
  //     //.pipe(sourcemaps.init())
  //     .pipe(
  //       sass({
  //         includePaths: [patternsBasePath],
  //         outputStyle: "compressed"
  //       }).on("error", sass.logError)
  //     )
  //     //.pipe(sourcemaps.write())
  //     .pipe(autoprefixer())
  //     .pipe(gulp.dest(config.distPath + "/css"))
  // );

  // If I'm commenting everything out, I need to explicitly return something from this function or my process hangs!
  done();
};


/**
 * Concatenate and minify js
 */
function js() {
  return (
    gulp
      .src(config.patternsBasePath + "/**/!(_!)*.js")
      .pipe(concat("site.js"))
      .pipe(
        concat.header(
          "(function(window, document, $, Drupal) {\n'use strict';\n"
        )
      )
      .pipe(
        concat.footer("\n})(window, document, window.jQuery, window.Drupal);\n")
      )
      .pipe(removeCode({ patternLab: true }))
      // .pipe(gulp.dest(config.distPath + "/js"))
      .pipe(gulp.dest(config.patternsDistPath + "/js"))
      .pipe(gulp.dest(config.plabPublicPath + "/js"))
      //.pipe(rename('site.js'))
      .pipe(
        minify({
          ext: {
            min: ".min.js"
          }
        })
      )
      .pipe(gulp.dest(config.distPath + "/js"))
      .pipe(browserSync.stream({ match: "**/*.js" }))
  );
  // return(done);
};


/**
 * Watch for changes in scss and js files and compile on
 * save, watch for changes in twig files and theme file and
 * drush cc.
 */
function watch() {
  // gulp.watch(config.patternsBasePath + "/**/*.twig", ['pl:generate']);
  gulp.watch(config.patternsBasePath + "/**/*.scss", css);
  gulp.watch(config.patternsBasePath + "/**/*.js", js);
  gulp.watch(
    [
      config.patternsBasePath + "/**/*.twig",
      config.drupalTemplates + "/**/*.twig",
      config.themeRoot + "prc_theme.theme"
    ],
    clearcache);
  gulp.watch(config.patternsBasePath + "/10-atoms/15-icon/config.json", importJson);
  gulp.watch(config.patternsDistPath + "/fonts", copyFonts);
};


/**
 * Initialize browser sync with pattern library in
 * Pattern Lab, compile scss & js on change, clear drush
 * cache on change, reload browser sync
 */

function plServe() {
  importJson();
  browserSync.init({
    open: false,
    server: {
      baseDir: "./.pattern-lab/public",
    },
    startPath: "",
    browsers: false
  });
  gulp.watch(config.patternsBasePath + "/**/*.scss", css);
  gulp.watch(config.patternsBasePath + "/**/*.js", js);
  gulp.watch(
    config.patternsBasePath + "/**/*.twig",
    gulp.series(plGenerate, browserSyncReload)
  );
  gulp.watch(config.patternsBasePath + "/10-atoms/15-icon/config.json", importJson);
  gulp.watch(config.patternsDistPath + "/fonts", copyFonts);
};


/**
 * Initialize browser sync with drupal site, compile scss
 * & js on change, clear drush cache on change, reload
 * browser sync
 */
function drupalServe() {
  importJson();
  browserSync.init({
    open: false,
    proxy: config.localServerUrl
  });
   gulp.watch(
     config.patternsBasePath + "/**/*.scss",gulp.parallel(css, drupalCss)
   );
  gulp.watch(config.patternsBasePath + "/**/*.js", js);
  gulp.watch(
    [
      config.patternsBasePath + "/**/*.twig",
      config.drupalTemplates + "/**/*.twig",
      config.themeRoot + "radicati_d8.theme"
    ],
    gulp.series("clearcache", browserSyncReload)
  );
  gulp.watch(config.patternsBasePath + "/10-atoms/15-icon/config.json", importJson);
  gulp.watch(config.patternsDistPath + "/fonts", copyFonts);
};


/**
 * Set up gulp task commands / aliases
 */
// drush cc
exports.drushcc = clearcache;
exports.clearcache = clearcache;
exports.cc = clearcache;
exports.cr = clearcache;
// import json
exports.json = importJson;
// copy fonts
exports.fonts = copyFonts;
exports.copyFonts = copyFonts;
// compile css
exports.css = css;
exports.styles = css;
// compile drupal adminimal css
exports.cssp = drupalCss;
exports.drupalcss = drupalCss;
// compile wysiwyg css
exports["css:wysiwyg"] = wysiwyg;
exports.wysiwyg = wysiwyg;
// compile js
exports.js = js;
// watch css & js
exports.watch = watch;
// generate pl
exports.plGenerate = plGenerate;
exports['pl:generate'] = plGenerate;
// start up site server with browsersync; watch css, js, and twig files
exports.sync = drupalServe;
exports.drupal = drupalServe;
exports.drupalServe = drupalServe;
exports["drupal:sync"] = drupalServe;
// start up Pattern Lab pattern library server with browsersync; watch css, js, and twig files
exports.serve = plServe;
exports.plServe = plServe;
exports.pl = plServe;
exports['pl:serve'] = plServe;
// set the default task to serve the site
exports.default = drupalServe;


