var gulp = require("gulp");
var pug = require("gulp-pug");
var plumber = require("gulp-plumber");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;
var stream = browserSync.stream;
var concat = require("gulp-concat");
var imagemin = require("gulp-imagemin");

// 将pug文件转换为html文件
gulp.task("convertPug", function() {
    gulp.src("src/index.pug")
        .pipe(plumber())
        .pipe(pug({ pretty: false }))
        .pipe(plumber.stop())
        .pipe(gulp.dest("dist"))
        .pipe(gulp.dest("../lovedlyl.github.io/imooc-learn-182"))
        .pipe(stream());
});

// 合并库文件
var lib = function() {
    // 样式
    gulp.src(["bower_components/bootstrap/dist/css/bootstrap.min.css"])
        // .pipe(concat("bootstrap.css"))
        .pipe(gulp.dest("../lovedlyl.github.io/imooc-learn-182/styles"))
        .pipe(gulp.dest("dist/styles"));
    // 字体文件
    gulp.src(["bower_components/bootstrap/dist/fonts/*"])
        .pipe(gulp.dest("../lovedlyl.github.io/imooc-learn-182/fonts"))
        .pipe(gulp.dest("dist/fonts"))

    // 脚本
    gulp.src(["bower_components/jquery/dist/jquery.min.js",
            "bower_components/bootstrap/dist/js/bootstrap.min.js"
        ])
        .pipe(concat("bootstrap.js"))
        .pipe(gulp.dest("../lovedlyl.github.io/imooc-learn-182/scripts"))
        .pipe(gulp.dest("dist/scripts"))
}

lib();
gulp.task("lib", lib);

// 图片压缩
var images = function() {
    gulp.src("src/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/images"))
        .pipe(gulp.dest("../lovedlyl.github.io/imooc-learn-182/images"))
}
images();
gulp.task("images", images);


gulp.task("default", function() {
    browserSync.init({
        // server: "dist"
        server: "../lovedlyl.github.io/imooc-learn-182"
    });

    gulp.watch("src/*.pug", ["convertPug"])

})
