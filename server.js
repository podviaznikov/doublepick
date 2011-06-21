var util = require('util'),
    express = require('express'),
    connect = require('connect'),
    app = express.createServer();

app.get('/',function(req,res){
    res.write('Hello');
    res.end();
});
app.listen(process.env.C9_PORT);
util.log('started app');