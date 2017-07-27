// require express and other modules
var express = require('express')
var app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

app.get('/api/profile', function getProfile(req, res) {
  var profile = res.json({
    name: "ALEX LI",
    githubLink: "https://github.com/alexliinc",
    githubImage: "https://avatars1.githubusercontent.com/u/2714982?v=4&s=460",
    currentCity: "DENVER, CO",
    pets: [{
        name: "fry",
        type: "dog"
      },
      {
        name: "catchup",
        type: "cat"
      }
    ]
  });
});

// get all movies
app.get('/api/movies', function(req, res) {
  //res.send("one movie")
  db.Movie.find(function(err, movies) {
    if (err) {
      return console.log("index error: " + err);
    }
    res.json(movies);
  });
});

// get one movie
app.get('/api/movies/:id', function(req, res) {
  // find one book by its id
  //res.send("one movie")
  console.log('movie show', req.params);
  db.Movie.findOne({
    _id: req.params.id
  }, function(err, movies) {
    if (err) {
      return console.log(err);
    }
    res.json(movies);
  });
});

// create new movie
app.post('/api/movies', function(req, res) {
  //res.send("one new movie");
  var newMovie = new db.Movie({
    title: req.body.title,
    staring: req.body.staring,
    releaseDate: req.body.releaseDate
  });

  newMovie.save(function(err, movie) {
    if (err) {
      return console.log("save error: " + err);
    }
    console.log("saved ", movie.title);
    // send back the book!
    res.json(movie);
  });
});

// update movie
app.put('/api/movies/:id', function(req, res) {
  //res.send("one UPDATE movie");
  db.Movie.update({
    _id: req.params.id
  }, {
    title: req.body.title,
    staring: req.body.staring,
    releaseDate: req.body.releaseDate
  }, function(err, movie) {
    if (err) {
      return console.log("save error: " + err);
    }
    console.log("saved ", movie.title);
    // send back the book!
    res.json(movie);
  });
});


// delete movie
app.delete('/api/movies/:id', function(req, res) {
  //res.send("one DELETED movie");
  var movieId = req.params.id;
  db.Movie.findOneAndRemove({
      _id: movieId
    })
    .exec(function(err, deletedMovie) {
      res.json(deletedMovie);
    });
});



// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */


app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woops_i_has_forgot_to_document_all_my_endpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/alexliinc/express-personal-api/blob/master/README.md", // CHANGE ME
    base_url: "https://shielded-shelf-76619.herokuapp.com/", // CHANGE ME
    endpoints: [{
        method: "GET",
        path: "/api",
        description: "Describes all available endpoints"
      },
      {
        method: "GET",
        path: "/api/profile",
        description: "Here is some data about Alex"
      }, // CHANGE ME
      {
        method: "POST",
        path: "/api/campsites",
        description: "E.g. Create a new campsite"
      }, // CHANGE ME
      {
        method: "GET",
        path: "/api/movies",
        description: "Here are all the movies you should watch"
      },
      {
        method: "POST",
        path: "/api/movies",
        description: "Adding a new movie"
      },
      {
        method: "PUT",
        path: "/api/movies/:id",
        description: "Updating a movie"
      },
      {
        method: "DELETE",
        path: "/api/movies/:id",
        description: "Deleteing a movie from the list"
      },
    ]
  })
});



/**********
 * SERVER *
 **********/

// listen on port 3000
//app.listen(process.env.PORT || 3000)
app.listen(process.env.PORT || 3000, function() {
  console.log('Express server is up and running on http://localhost:3000/');
});
