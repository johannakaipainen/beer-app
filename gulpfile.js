const gulp = require('gulp');

const fs = require("fs");
const rimraf = require("rimraf");
const ncp = require("ncp").ncp;

const less= require('gulp-less');
const path = require('path');
 
const browserify = require("browserify");
const babelify=require("babelify");
const source = require('vinyl-source-stream');


/*
    We will talk more about node.js fs-module and ncp+rimraf extension modules later on
    but to make this work you will need to:

    > npm i --save requirejs
    > npm i --save-dev gulp
    > npm i --save-dev rimraf
    > npm i --save-dev ncp
    > npm i --save-dev @babel/core
    > npm i --save-dev @babel/preset-env
    > npm i --save-dev babelify
    > npm i --save-dev browserify
    > npm i --save-dev vinyl-source-stream

    Possibly also:
    > npm i -g gulp-cli
*/

/*
    add postinstall script to your package.json
    "postinstall":"gulp copyLibs"
*/


const wwwroot="wwwroot";
const libDir=wwwroot+"/libs";

// Specialized version to copy bootstrap from node_modules to wwwroot/libs
function copyBs(cb){
    ncp('node_modules/bootstrap/dist','wwwroot/libs/bootstrap',function(err){
        if (err) console.log("Error with bootstrap",err);
        cb();
    })
}

const libFiles = [
	
];

function copyLibs(cb){
    rimraf(libDir,function(){
        fs.mkdir(libDir,function(){
            libFiles.forEach(function(f){
                fs.stat('node_modules/'+f,function(err,stat){
                    if (err){
                        console.log("Cannot stat",f);
                        return;
                    }
                    else{
                        if (stat.isDirectory()){
                            ncp('node_modules/'+f,libDir+'/'+f,function(err){
                                if (err) console.log("Error with",f)
                                else console.log('Copied',f);
                            })
                        }
                        else{
                            gulp.src('node_modules/'+f).pipe(gulp.dest(libDir));
                        }
                    }
                })
            })
            copyBs(cb);
        })
    })
}


function lessCompile(){
    return gulp.src('./styles/**/*.less')
      .pipe(less({
        paths: [ path.join(__dirname, 'less', 'includes') ]
      }))
      .pipe(gulp.dest('./wwwroot/styles'));
}



function jsx(){
    let sourceFolder='./client/';
	let startFile="app";
    let targetFolder='./wwwroot/app';
	let file=sourceFolder+startFile+'.jsx';
	let bundle=startFile+".bundle.js";
	return browserify({
			entries: file,
			extensions: ['.js','.jsx'],
			debug: true
		})
		.transform(babelify.configure({presets: ["@babel/env","@babel/react"]}))
		.bundle()
		.on("error",err => {
			console.log("ERROR:",err.message);
			console.log(err.codeFrame);
		})
		.pipe(source(bundle))
		.pipe(gulp.dest(targetFolder));
}


exports.copyLibs=copyLibs;
exports.jsx=jsx;
exports.less=lessCompile;