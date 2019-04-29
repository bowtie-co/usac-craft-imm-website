var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var watch        = require('gulp-watch');
var cleanCSS     = require('gulp-clean-css');
var uglify       = require('gulp-uglify');
var concat       = require('gulp-concat');
var browserSync  = require('browser-sync').create();
var gulpUtil     = require('gulp-util');
var babel        = require('gulp-babel');
var reload       = browserSync.reload;
var sourcemaps   = require('gulp-sourcemaps');
var vueify       = require('gulp-vueify');

var onError = function (err) {
    console.log(err.message);
    this.emit('end');
};

// js
var jsPaths = [

  // put vendor js files here so they're loaded first
  'src/js/vendor/jquery.min.js',
  'src/js/vendor/foundation.min.js',
  'src/js/vendor/swiper.min.js',
  'src/js/vendor/slick.min.js',
  'src/js/vendor/foundation-datepicker.min.js',
  'src/js/vendor/masonry.pkgd.min.js',
  'src/js/vendor/jquery.waypoints.min.js',
  'src/js/vendor/sticky.min.js',
  'src/js/vendor/bigtext.js',
  'src/js/vendor/moment.min.js',
  'src/js/vendor/abide.js',

  // put modules here with main.js last
  'src/js/modules/viewmore.js',
  'src/js/modules/mailchimp.js',
  'src/js/modules/imagetextcarousel.js',
  'src/js/modules/eventcarousel.js',
  'src/js/modules/featurecardcarousel.js',
  'src/js/modules/cardgridcarousel.js',
  'src/js/modules/socialcarousel.js',
  'src/js/modules/newsarticledynamic.js',
  'src/js/modules/newsarticle.js',
  'src/js/modules/hero.js',
  'src/js/modules/datapushga.js',
  'src/js/modules/userlogin.js',
  'src/js/modules/navigation.js',
  'src/js/modules/events.js',
  'src/js/modules/account.js',
  'src/js/modules/faqs.js',
  'src/js/modules/clips.js',
  'src/js/modules/search.js',
  'src/js/modules/waivers.js',

  // leave main.js alone, unless you're adding more modules to it
  'src/js/main.js',
  //'src/js/vendor/vue.min.js',
  'src/js/vendor/vue-infinite-scroll.js',
  'src/js/vendor/axios.min.js'
];

var vuePaths = [
    //'src/vue/vue-events.js',
    'src/vue/vue-account.js',
    'src/vue/vue-rr.js',
    'src/vue/vue-waivers.js',
    'src/vue/vue-find-a-club.js',
    'src/vue/vue-find-a-coach.js',
    'src/vue/account/profile.js'
];

gulp.task('js', function() {
  return gulp.src(jsPaths)
      .pipe(sourcemaps.init())
      // .pipe(babel({
      //   presets: ['es2015']
      // }))
      .pipe(concat('bundle.min.js'))
      .pipe(uglify().on('error', gulpUtil.log))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./js'))
      .pipe(browserSync.stream())
});

gulp.task('vue', function() {
  return gulp.src(vuePaths)
      .pipe(sourcemaps.init())
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(concat('vuebundle.min.js'))
      .pipe(uglify().on('error', gulpUtil.log))
      .pipe(gulp.dest('./js'))
});

/* gulp.task('vueify', function () {
    return gulp.src('src/vue/vue-events.vue')
        .pipe(vueify())
        .pipe(gulp.dest('./js'));
}); */

// sass
gulp.task('sass', function() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass({
      includePaths: [].concat(require('node-bourbon').includePaths, ['node_modules/foundation-sites/scss', 'node_modules/motion-ui/src'])
    }))
    .on('error', onError)
    .pipe(cleanCSS())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream())
});

// browser sync server for live reload
gulp.task('watch', function() {
  browserSync.init({
    ui: {
      port: 8080
    },
    open: "external",
    host: "usac.localhost",
    proxy: "usac.localhost",
    port: 8080
  });
  gulp.watch('./src/js/**/*.js', ['js']);
  gulp.watch('./src/vue/**/*.js', ['vue']);
  gulp.watch('./src/scss/**/*.scss', ['sass']);
  //gulp.watch('./src/scss/partials/**/*.scss', ['sass']);
});
