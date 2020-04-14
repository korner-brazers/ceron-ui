/** Что-бы все не пропало! **/
process.on('uncaughtException', function (err) {
    console.log(err)
});


var gulp           = require('gulp'), // Подключаем Gulp
	sass           = require('gulp-sass'), //Подключаем Sass пакет,
	concat         = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	uglify         = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
	cssnano        = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	rename         = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	del            = require('del'), // Подключаем библиотеку для удаления файлов и папок
	autoprefixer   = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
	filter         = require('gulp-filter'),
	fileinclude    = require('gulp-file-include'),
	order          = require('gulp-order'),
	fs             = require('fs'),
	path           = require('path'),
	chokidar       = require('chokidar'),
	replace        = require('gulp-replace');



var project   = 'raid';

var srcFolder = 'src';
var dstFolder = 'dist';


gulp.task('sass', function(){
	return gulp.src([srcFolder+'/*.scss','!'+srcFolder+'/_*.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7', 'ios 6', 'android 4'], { cascade: true }))
		.pipe(replace(/M_/g, '--'))
		.pipe(replace(/--xs/g, ''))
		.pipe(replace(/Mx_/g, '--'))
		.pipe(replace(/--al/g, ''))
		.pipe(gulp.dest(dstFolder))
});




gulp.task('watch', function(){
	gulp.watch(srcFolder+'/**/*', ['sass']);

	var watcher = chokidar.watch(srcFolder+'/tpl', {ignored: /^\./, persistent: true});

		watcher.on('add', function(path) {
			console.log('File', path, 'has been added');

		})
		.on('change', function(path) {
			console.log('File', path, 'has been changed');

		})
		.on('unlink', function(path) {
			console.log('File', path, 'has been removed');
		})
		.on('error', function(error) {
			console.error('Error happened', error);
		})
});


gulp.task('default', ['watch']); //по дефолту запускаем слежение за изменениями
