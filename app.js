var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req , res) {
    res.render('home.ejs')
})

app.get('/:time', function(req, res){
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
    var isUnix = /^\d+$/.test(req.params.time)
    if (isUnix){
        var natural =  new Date(Number(req.params.time) * 1000);
        var formattedDate = months[natural.getMonth()] + ' ';
        formattedDate += natural.getDate() + ', ';
        formattedDate += natural.getFullYear();
        var timeObj = {unix : Number(req.params.time), natural : formattedDate };
        res.send(JSON.stringify(timeObj));
    }
    else {
        var date = new Date(req.params.time);
        if (date === 'Invalid Date'){
            res.send({unix : null, natural : null})
        }
        else {
            var timeObj = {unix : date.getTime()/1000, natural : req.params.time}
            res.send(JSON.stringify(timeObj));
        }
    }
    
})

app.post('/', function(req, res){
    var time = req.body.time;
    res.redirect('/' + time);
    
})

app.post('/current', function(req, res){
    var currentDate = new Date();
    var time = currentDate.getTime();
    res.redirect('/' + Math.round(Number(time) / 1000));
    
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server is up!')
})