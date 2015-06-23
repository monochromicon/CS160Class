var gulp       = require("gulp"),
	minifyHTML = require("gulp-minify-html"),
	minifyCSS  = require("gulp-minify-css"),
	uglify     = require("gulp-uglify"),
	jade       = require("gulp-jade"),
	connect    = require("gulp-connect"),
	rsync      = require("gulp-rsync");
	
gulp.task("default", function () {
	gulp.src("src/css/index.css")
		.pipe(minifyCSS())
		.pipe(gulp.dest("dist/public/css/index.css"));
		
	gulp.src("src/js/app.js")
		.pipe(uglify())
		.pipe(gulp.dest("dist/public/js/app.js"));
		
	gulp.src("src/server.js")
		.pipe(uglify())
		.pipe(gulp.dest("dist/server.js"));
		
	gulp.src("src/index.jade")
		.pipe(jade())
		.pipe(minifyHTML())
		.pipe(gulp.dest("dist/public/index.html"));
		
	gulp.src("src/pages/**.jade")
		.pipe(jade)
		.pipe(minifyHTML())
		.pipe(gulp.dest("dist/public/pages/"));
	});

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
		root: "app",
		livereload: true
	});
});