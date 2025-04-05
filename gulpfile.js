global._r_      = __dirname;
const gulp      = require('gulp');
const path      = require('path');

const fs        = require('fs');
const b         = require('browserify');
const source    = require('vinyl-source-stream');
const buffer    = require('vinyl-buffer');
const rename    = require('gulp-rename');
const replace 	= require('gulp-replace');

const reg_import = /import(?:[\s.*]([\w*{}\n\r\t, ]+)[\s*]from)?[\s*](?:["'](.*[\w]+)["'])?/g;
const reg_export = /export(?:[\s.*]([\w*{\n\r\t, )]+[\}]))/g;
const reg_curlyb = /\{([^}]+)\}/;

var args = process.argv[2];

function handle(t,m,a,b) {
	var get_array = function(a){
		if (a.includes('{')) {
			var matches = a.match(reg_curlyb);
			var arr = matches[1].split(",").map(function(item) {
				return item.trim();
			});
		} else {
			arr = a;
		}
		return arr
	}
	arr = get_array(a)                 
	if (arr.length > 1) {
		a = `{${arr.join(', ')}}`;
	} else {
		a = arr[0];
	}
	if (t == 'import') {
		return `const ${a} = require("${b}")`
	}else {
		return `module.exports = ${a}`
	}
}

async function systemreplace() { 
	await new Promise((resolve, reject) => {
		gulp.src([
			'src/es/*.js'
		])
		.pipe(replace( reg_import, function handleReplace(m, a, b){
			return handle('import',m,a,b)
		}))
		.pipe(replace( reg_export, function handleReplace(m, a, b){
			return handle('export',m,a,b)
		}))
		.pipe(gulp.dest('src/cjs'))
		.on("end", browserifier);
	});
};

var _src_a = `${__dirname}/src/em.cjs.js`;

function browserifier(done) { 
	b({
		entries: _src_a,
		debug: false,
		fullpath: false
	})
	.bundle()
	.pipe(source('./src/em.cjs.js'))
	.pipe(buffer())
	.pipe(rename('em.js',{dirname: ''}))
	.pipe(gulp.dest('./lib'));
	if (done) done();
}

gulp.task('systemrep', async() => {
	systemreplace()
});

gulp.task('browserf', browserifier );

gulp.task('watch', function(){
    gulp.watch([
		'gulpfile.js', 
		'src/*/*.*',
		'src/em.cjs.js',
		'src/em.es.js'
	], {usePolling: true}, gulp.series(['systemrep']));
})

if (args == '--build') {
	gulp.task('default', gulp.series('systemrep'));
} else if (args == '--watch'){
	gulp.task('default', gulp.series('watch'));
}

gulp.task('default', gulp.series('systemrep'));