var gulp       = require("gulp"),
	minifyHTML = require("gulp-minify-html"),
	minifyCSS  = require("gulp-minify-css"),
	uglify     = require("gulp-uglify"),
	jade       = require("gulp-jade"),
	connect    = require("gulp-connect"),
	rsync      = require("gulp-rsync");
	
gulp.task("buildCSS", function () {
	gulp.src("src/css/index.css")
		.pipe(minifyCSS())
		.pipe(gulp.dest("dist/public/css/"))
		.pipe(connect.reload());
});

gulp.task("buildAng", function () {
	gulp.src("src/js/app.js")
		.pipe(uglify({
			mangle: false
		}))
		.pipe(gulp.dest("dist/public/js/"))
		.pipe(connect.reload());
});

gulp.task("buildServ", function () {
	gulp.src("src/server.js")
		.pipe(uglify())
		.pipe(gulp.dest("dist/"))
		.pipe(connect.reload());
});

gulp.task("buildHTML", function () {
	gulp.src("src/index.jade")
		.pipe(jade())
		.pipe(minifyHTML())
		.pipe(gulp.dest("dist/public/"))
		.pipe(connect.reload());
});

gulp.task("buildPages", function () {
	gulp.src("src/pages/**.jade")
		.pipe(jade())
		.pipe(minifyHTML())
		.pipe(gulp.dest("dist/public/pages/"))
		.pipe(connect.reload());
});

gulp.task("build", ["buildCSS", "buildAng", "buildServ", "buildHTML", "buildPages"]);

gulp.task("deploy", function () {
	gulp.src("dist/")
		.pipe(rsync({
			hostname: "monochromicon.me",
			username: "root",
			root: "dist",
			incremental: true,
			destination: "/var/web/cs"	
		}));
});

gulp.task("connect", function() {
	connect.server({
		root: "dist/public",
		livereload: true,
		port: 8080
	});
});

gulp.task("default", ["build", "connect"], function () {
	gulp.watch("src/index.jade", ["buildHTML"]);
	gulp.watch("src/pages/**.jade", ["buildPages"]);
	gulp.watch("src/js/app.js", ["buildAng"]);
	gulp.watch("src/server.js", ["buildServ"]);
	gulp.watch("src/css/index.css", ["buildCSS"]);
});