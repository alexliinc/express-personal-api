console.log("Sanity Check: JS is working!");
var template;
var $moviesList;
var allMovies = [];

$(document).ready(function() {

  // your code
  $moviesList = $('#movieTarget');
  var source = $('#movies-template').html();
  template = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: '/api/movies',
    success: handleSuccess,
    error: handleError
  });

  $('#newMovieForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: 'api/movies',
      data: $(this).serialize(),
      success: newMovieSuccess,
      error: newMovieError
    })
  });

  $moviesList.on('click', '.deleteBtn', function() {
    console.log('clicked delete button to', '/api/movies/' + $(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/movies/' + $(this).attr('data-id'),
      success: deleteMovieSuccess,
      error: deleteMovieError
    });
  });

});

// HELPER FUNCTIONS
function render() {
  $moviesList.empty();

  var moviesHTML = template({
    movies: allMovies
  });

  $moviesList.append(moviesHTML);
};

function handleSuccess(json) {
  allMovies = json;
  render();
}

function handleError(e) {
  console.log("NOPE");
  $('#movieTarget').text('Failed to load movies, is the server working?');
}

function newMovieSuccess(json) {
  $('#newMovieForm input').val('');
  allMovies.push(json);
  render();
}

function newMovieError() {
  console.log('new Movie ERROR!!');
}

function deleteMovieSuccess(json) {
  var movie = json;
  console.log(json);
  var movieId = movie._id;
  console.log('deleted movie', movieId);
  // Remove the movie from our allMovies array
  for (var index = 0; index < allMovies.length; index++) {
    if (allMovies[index]._id === movieId) {
      allMovies.splice(index, 1);
      break
    }
  }
  render();
}

function deleteMovieError() {
  console.log('delete movie error!!!');
}
