// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var movies_list = [{
    title: "Thor: Ragnarok",
    staring: "CHRIS HEMSWORTH",
    releaseDate: "April 11, 2017"
  },
  {
    title: "Spider-Man: Homecoming",
    staring: "TOM HOLLAND",
    releaseDate: "March 28, 2017"
  },
  {
    title: "Guardians of the Galaxy Vol.2 ",
    staring: "CHRIS PRATT",
    releaseDate: "February 29, 2017"
  },
  {
    title: "Pirates of the Caribbean: Dead Men Tell No Tales",
    staring: "JOHNNY DEPP",
    releaseDate: "February 7, 2017"
  }
];

// removing all movies
db.Movie.remove({}, function(err, movies) {
  if (err) {
    console.log('Error is', err);
  } else {
    console.log('Removed All Movies');
    // creating all new movies
    db.Movie.create(movies_list, function(err, movies) {
      if (err) {
        return console.log('err', err);
      } else {
        console.log("created", movies.length, "movies");
        process.exit();
      }
    });
  }
});

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })
