var util = require('util'),
    express = require('express'),
    connect = require('connect'),
    app = express.createServer();

//configuration
app.configure(function(){
    app.use(connect.favicon(__dirname + '/public/16.png'));
    //logger
    app.use(express.logger());
    //component for decoding requests' params
    app.use(express.bodyParser());
    //session support
    app.use(express.cookieParser());
    app.use(express.session({secret: 'super_hard_session_secret',cookie:{ path: '/', httpOnly: true, maxAge: 14400000000000000 }}));
    //router
    app.use(app.router);
    //public folder for static files
    app.use(express.static(__dirname+'/public'));
});

app.get('/test',function(req,res){
    res.write('Hello');
    res.end();
});
app.listen(process.env.C9_PORT);
util.log('started app');