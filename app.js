var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var mongoose = require('mongoose');
var db = mongoose.connection;
var Schema = mongoose.Schema;

var app = express();

// set db
db.on('error', console.error.bind(console, 'connection error :'));
db.once('open', function(){
   console.log('connect successflly');
});

mongoose.connect('mongodb://localhost/board');

var ArticleSchema = Schema({
  'id' : String,
  'author' : String,
  'title' : String,
  'content' : String
});

var Article = mongoose.model('article', ArticleSchema);

// db조회 함수
function getArticles(res) {
  Article.find(function(err, data) {
    if(err){
      console.error(err);
      return;
    } else {
      // 데이터를 클라이언트로 응답
      res.json(data);
    }
  });
}

// set ejs
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

// body-parser
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//set path
app.use('/views', express.static(__dirname + '/views'));
app.use('/public', express.static(__dirname + '/public'));

// index.ejs  시작페이지
app.get('/', function (req, res) {
  res.render('index');
});

// 새글작성 클릭시 페이지
app.get('/insert', function (req, res) {
  res.render('insert');
});

// 수정 클릭시 페이지
app.get('/edit', function (req, res) {
  res.render('edit');
});


// 조회서비스
app.get('/api/articles', function(req, res){
  getArticles(res);
});

// 데이터 삽입 & 수정
app.post('/api/articles', function(req, res) {
  var title = req.body.title;
  var content = req.body.content;

  var article = new Article();
  article.title = title;
  article.content = content;
  article.save(function(err){
    if(err){
      console.error(err);
      return;
    } else {
      getArticles(res);
    }
  });
});

// 수정
app.post('/api/edit', function(req, res) {
  var id = req.body._id;
  var title = req.body.title;
  var content = req.body.content;

  var article = Article.findOne({ _id : id });
  article.title = title;
  article.content = content;
  article.save(function(err){
    if(err){
      console.error(err);
      return;
    } else {
      getArticles(res);
    }
  });
});

app.listen(3001, function() {
  console.log('Example app listening on port 3001!');
});
