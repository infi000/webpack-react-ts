const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const tsConfig = ts.createProject('./tsconfig_gulp.json');
const eslint = require('gulp-eslint');

const entry = './src/server/**/*.ts';



// 上线环境
function buildprod() {
    return gulp
        .src(entry)
        .pipe(tsConfig())
        .pipe(
            babel({
                // ignore: ['./src/server/config/*.js'],
                babelrc: false,
                plugins: [
                    [
                        '@babel/plugin-proposal-decorators',
                        {
                            legacy: true
                        }
                    ],
                    'babel-plugin-transform-es2015-modules-commonjs'
                    // 'transform-es2015-modules-commonjs'
                ]
            })
        )
        .pipe(gulp.dest('dist'));
}


// 对代码进行检查的环境
function buildlint() {
    return gulp.src(entry)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

let build = gulp.series(buildprod);


if (process.env.NODE_ENV == "lint") {
    build = gulp.series(buildlint)
}

gulp.task('default', build);
