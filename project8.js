//Let it be publicly known that this is the best song to ever be written ever.
//https://www.youtube.com/watch?v=NM3JqyLN7yw

// for u json faga
var konsole = {
  laug: console.log
};

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

let app = express();
var jsonParser = bodyParser.json()

app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));

function getUserById(id) {
  var obj = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  for (var i = 0; i < obj.length; i++) {
    if (obj[i].id == id) return obj[i];
  }
}

function saveUser(user) {
  var obj = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  for (var i = 0; i < obj.length; i++) {
    if (obj[i].id == user.id) {
      obj[i] = user;
      fs.writeFileSync('data.json', JSON.stringify(obj));
      return i;
    }
  }
  obj.push(user);
  fs.writeFileSync('data.json', JSON.stringify(obj));
}

app.get('/', function (req, res) {
  //Do something here with the file system that allows pug to access a JSON object I think?
  var obj = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  res.render('index', {data: obj});
  konsole.laug('Index page request fulfilled');
});
app.get('/edituser/:user', function (req, res) {
  var user = req.params.user;
  var obj = getUserById(user);
  res.render('editUser', {user: obj});
  konsole.laug('Edit user page request fufilled');
});
app.get('/createuser', function (req, res) {
  res.render('createUser');
  konsole.laug('Create User page request fufilled');
});



app.post('/usertarget', function(req, res) {
  var obj = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  let newBoi = {
    name:req.body.name,
    id:req.body.id,
    email:req.body.email,
    age:req.body.age
  }
  konsole.laug(newBoi);
  obj.push(req.body);
  fs.writeFile('data.json', JSON.stringify(obj));
  konsole.laug('Create post');
  res.redirect('/');
});
app.post('/deleteuser', function(req, res) {
  konsole.laug('delete user attempted');
  konsole.laug(req.body);
  /*res.header('Content-Type', 'application/json');
  res.send(JSON.stringify({
    success: true
  }));*/
  var obj = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  var indexOf;
  for (var i = 0; i < obj.length; i++) {
    if (obj[i].id == req.body.user) {
      konsole.laug('this is running and werking and doug can go to sleep');
      obj.splice(i,1);

    } else{
      konsole.laug('doug');
    }
  }

  fs.writeFile('data.json', JSON.stringify(obj), function (err) {
    res.json({
      success: err ? false : true
    });
  });
});
app.post('/updatetarget', function(req, res) {
  konsole.laug(req.body)
  saveUser(req.body);
  konsole.laug('J-QUERY WILL HELP YOU BUILD YOUR DOTKOM, FIND AN ELEMENT INSIDE OF THE DOM, WITH AJAX TRAVERSAL MANIPULATION, EVENT HANDLING, AND NAVIGATION, PROVIDING YOU WITH VERSITILITY, AN API WITH EXTENSIBILITY, JQUERY IS SOMETHING YOU CAN NOT IGNORE, WRITE LESS, DO MORE!');
  res.redirect('/');
});


var port = 3000;

app.listen(port);

konsole.laug('listening on port ' + port);
