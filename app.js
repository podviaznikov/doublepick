var express=require('express'),
    connect=require('connect'),
    stylus=require('stylus'),
    nib=require('nib'),
    app=express.createServer();

function compile(str,path){
  return stylus(str)
    .set('filename',path)
    .set('warn',true)
    .set('compress',true)
    .use(nib());
};
//express app configuration
app.configure(function(){
    //app.use(connect.favicon(__dirname + '/public/16.png'));
    //logger
    app.use(express.logger());
    //component for decoding requests' params
    app.use(express.bodyParser());
    //session support
    app.use(express.cookieParser());
    app.use(express.session({secret:'super_hard_session_secret',cookie:{path:'/',httpOnly:true,maxAge:365*24*60*1000}}));
    //router
    app.use(app.router);
    //stylus
    app.use(stylus.middleware({
        src:__dirname+'/styl',
        dest: __dirname+'/public',
        compile:compile
    }));
    //public folder for static files
    app.use(express.static(__dirname+'/public'));
});
exports.app=app;