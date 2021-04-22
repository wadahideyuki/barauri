// gulpプラグインの読み込み
const gulp = require('gulp'),
  // エラーによる停止を防止するプラグインの読み込み
  plumber = require('gulp-plumber'),
  // デスクトップ通知のプラグインの読み込み
  notify = require('gulp-notify'),
  // Sassをコンパイルするプラグインの読み込み
  sass = require('gulp-sass'),
  // mediaqueryをまとめる
  cmq = require('gulp-combine-media-queries'),
  // パグ
  //pug = require('gulp-pug'),
  // ブラウザシンク
  browserSync = require('browser-sync'),
  //画像の圧縮
  changed  = require('gulp-changed'),
  imagemin = require('gulp-imagemin'),
  imageminJpg = require('imagemin-jpeg-recompress'),
  imageminPng = require('imagemin-pngquant'),
  imageminGif = require('imagemin-gifsicle'),
  svgmin = require('gulp-svgmin');


// パスの設定
var paths = {
    rootDir : 'htdocs',
    cssDir : 'htdocs/css',
    scssDir : 'src/css',
    srcImgDir : 'src/img',
    dstImgDir : 'htdocs/img'
};



// scssのコンパイル
function fncScss(){
  console.log("sassを実行");
	// .scssファイルを取得
	gulp.src([paths.scssDir + '/**/*.scss'])
	// エラーでも止まらないように
	.pipe(plumber({
		// エラーをデスクトップ通知
		errorHandler: notify.onError({
			message: "ふぁいる→ <%= error.message %>",
			title: "えすしーえすえすのえらー",
			icon: "error.png"
		})
	}))
	// Sassのコンパイルを実行
	.pipe(sass({outputStyle: 'expanded'})
	// Sassのコンパイルエラーを表示
	// (これがないと自動的に止まってしまう)
	.on('error', sass.logError))
	// cssフォルダー以下に保存
	.pipe(gulp.dest(paths.cssDir));
};

// メディアクエリをまとめる
function fncCmq(){
	gulp.src([paths.cssDir + '/**/*.css'])
	.pipe(cmq({
		log: false
	}))
	.pipe(gulp.dest(paths.cssDir));
};

// jpg,png,gif画像の圧縮タスク
function fncImagemin(){
  console.log("画像を圧縮");
  var srcGlob = paths.srcImgDir + '/**/*.+(jpg|jpeg|png|gif)';
  var dstGlob = paths.dstImgDir;
  return gulp.src( srcGlob )
    .pipe(changed( dstGlob ))
    .pipe(imagemin([
      imageminPng(),
      imageminJpg(),
      imageminGif({
        interlaced: false,
        optimizationLevel: 3,
        colors:180
      })
    ]))
    .pipe(gulp.dest( dstGlob ));
};
// svg画像の圧縮タスク
function fncSvgmin(){
  console.log("SVGを圧縮");
  var srcGlob = paths.srcImgDir + '/**/*.+(svg)';
  var dstGlob = paths.dstImgDir;
  return gulp.src( srcGlob )
    .pipe(changed( dstGlob ))
    .pipe(svgmin({
      plugins:[{
        removeViewBox: false //ViewBox属性を削除しない
      }]
    }))
    .pipe(gulp.dest( dstGlob ));
};

// ブラウザシンク
function fncBrowserSync(done){
  console.log("BS立ち上げ");
	browserSync({
		server:{
			baseDir: paths.rootDir,
			index: "index.html"
		}
	});
  done();
};

// ★ ファイルを監視
gulp.task("watch", function(){
  // ブラウザリロード
  function bsReload(){
    browserSync.reload();
  }

  //gulp.watch(paths.pugDir + '/**/*.pug').on('change', fncPug);
  gulp.watch(paths.scssDir + '/**/*.scss').on('change', fncScss);
//	gulp.watch(paths.cssDir + '/**/*.css').on('change', gulp.series(fncCmq, bsReload));
  gulp.watch(paths.rootDir + '/**/*.html').on('change', bsReload);
  gulp.watch(paths.cssDir + '/**/*.css').on('change', bsReload);
  gulp.watch(paths.srcImgDir + '/**/*', gulp.series(fncSvgmin, fncImagemin));
  console.log("監視を実行");
});

// npx gulpで実行
exports.default = gulp.series(
  gulp.parallel(
    fncBrowserSync,
    'watch'
  )
);
//gulp.task('default',
//  gulp.series(
//    gulp.parallel(
//      'browser-sync',
//      'watch'
//    )
//  )
//);







