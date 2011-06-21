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

app.get('/cards',function(req,res){
    var cards=[{
           cardId:1,
           img:'picker/bleach_any.png'
        },
        {
           cardId:2,
           img:'picker/bleach_oxygen.png'
        },
        {
           cardId:3,
           img:'picker/bleach_chlorine.png'
        },
        {
           cardId:4,
           img:'picker/cleaning_HCS.png'
        },
        {
           cardId:5,
           img:'picker/cleaning_HCS_very-delicate.png'
        },
        {
           cardId:6,
           img:'picker/cleaning_HCS_delicate.png'
        }];
    res.write(JSON.stringify(cards));
    res.end();
});
app.listen(process.env.C9_PORT);
util.log('started app');