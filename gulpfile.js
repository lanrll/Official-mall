const gulp = require('gulp'),
      htmlmin = require('gulp-htmlmin'),
      cleanCss = require('gulp-clean-css'),
      uglify = require('gulp-uglify'),
      babel = require('gulp-babel'),
      connect = require('gulp-connect'),
      sass = require('gulp-sass')
      // css = require('gulp-css')
// 制定html任务：把src里面的html文件压缩之后放进dist目录
gulp.task('html', () => {
  gulp.src("src/**/*.html")
    .pipe(htmlmin({
      removeComments: true,//清除HTML注释
      collapseWhitespace: true,//压缩HTML
      collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input checked/>
      removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
      removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
      minifyJS: true,//压缩页面JS
      minifyCSS: true//压缩页面CSS 
    }))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
})
// 制定css任务：把src里css文件取出来，压缩，放进dist目录
gulp.task('scss', () => {
  // gulp.src('src/css/**/*.css')
  gulp.src('src/css/**/*.scss')
    .pipe(sass())
    // .pipe(cleanCss())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
})
gulp.task('css', () => {
  gulp.src('src/css/**/*.css')
    // .pipe(cleanCss())
    .pipe(gulp.dest('dist/css'))
})
// 制定js任务，把src里面的所有js文件取出来，先ES6转ES5，然后压缩，放进dist目录
gulp.task('js', () => {
  gulp.src('src/js/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    // .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload())
})
// 制定一个server任务，打开服务器
gulp.task('server', () => {
  connect.server({
    root: 'dist',
    port: 611,
    livereload: true
  });
})
// 制定一个图片任务：把src/images的图片复制到dist里
gulp.task('img', () => {
  gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images'))
})
// 制定libs任务：把src/libs的文件复制到dist
gulp.task('libs', () => {
  gulp.src('src/libs/**/*')
    .pipe(gulp.dest('dist/libs'))
})
// 监听文件的改变，文件改变之后自动执行对应的任务
gulp.task('watch', () => {
  // 监听html文件的修改，自动执行html任务
  gulp.watch('src/**/*.html', ['html'])
  gulp.watch('src/js/**/*.js', ['js'])
  gulp.watch('src/css/**/*.scss', ['scss'])
})
// 把所有默认要执行的任务放到一起
gulp.task('default', ['html', 'js', 'scss','css', 'server','img','libs', 'watch'])

