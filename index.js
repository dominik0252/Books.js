var express = require('express');
var app = express();

app.set('view engine', 'pug');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var Book = require('./Book.js');

app.use('/public', express.static('files'));

app.use('/createBook', (req, res) => {
  var newBook = new Book(req.body);

  newBook.save( (err) => {
    if (err) {
      res.type('html').status(500);
      res.send('Error: ' + err);
    } else {
      res.render('created', { book: newBook });
    }
  });
});

app.use('/api', (req, res) => {
  var query = {};
  if(req.query.title) query.title = { $regex : req.query.title };
  if(req.query.author) query['authors.name'] = { $regex : req.query.author };
  if(req.query.year) query.year = req.query.year;

  if(Object.keys(query).length != 0) {
    Book.find(query, (err, books) => {
      if (!err) res.json(books);
      else {
        console.log(err);
        res.json({});
      }
    });
  } else res.json({});
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
})