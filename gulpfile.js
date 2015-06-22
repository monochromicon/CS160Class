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
		.pipe(gulp.dest("dist/css/index.css"));
		
	gulp.src("src/js/app.js")
		.pipe(uglify())
		.pipe(gulp.dest("dist/js/app.js"));
		
	gulp.src("src/index.jade")
		.pipe(jade())
		.pipe(minifyHTML())
		.pipe(gulp.dest("dist/index.html"));
		
	gulp.src("src/pages/**.jade")
		.pipe(jade)
		.pipe(minifyHTML())
		.pipe(gulp.dest("dist/pages/"));
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