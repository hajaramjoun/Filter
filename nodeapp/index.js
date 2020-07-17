
let fs = require("fs");
let carte = require("./carte.json");
let express = require('express')
let app = express()
const bodyParser = require('body-parser');
const appRoutes = express.Router();
app.use(bodyParser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');//  172.17.0 ip for your vm 

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

appRoutes.route('/addcarte').post(function (req, res) {
    let doc = [req.body];
    let data = carte;
    JSON.stringify(data)
    Array.prototype.push.apply(data, doc);
    json = JSON.stringify(data); //convert it back to json 
     fs.writeFile('carte.json', json, 'utf8', function(err) {
    if (err) throw err; console.log('complete'); }  
    ); // write it back 
});

appRoutes.route('/delete').post(function (req, res) {
    let data = carte;
    let index = req.body.index;
    data.filter((e, i) => i !== index)
    console.log(data)
    
    json = JSON.stringify(data);
    console.log(json)
    fs.writeFile('carte.json', json, 'utf8', function(err) {
        if (err) throw err; console.log('complete'); }  
   ); 
});

appRoutes.route('/all').get(function (req, res) {
  res.json(carte)
    })   

app.use('/', appRoutes);
app.listen(8081, function () {
    console.log('app listening on port 8081!')
})