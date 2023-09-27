require('dotenv').config(); // Load environment variables from .env file
const express=require('express');
const mongoose=require('mongoose');
const app = express();
//const port = 8000;
const port = process.env.PORT || 8000; // Use the PORT environment variable or default to 8000

app.get('/', (req, res) => {
    res.send('ok')
  })
  //connect to db
  mongoose.connect(process.env.Mongo_url)
  .then(()=>{
    app.listen(port, () => {
      console.log(`connected to db & listening on port `,process.env.port)
    });
  
  })
  .catch((error)=> {
    console.log(error)
  })
  app.get('/test', (req, res) => {
    res.status(200).json({ status: 200, message: "ok" });
  });
  app.get('/time', (req, res) => {
    // Get the current time in hours and minutes
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    const currentTime = `${hours}:${minutes}`;
    
    res.status(200).json({ status: 200, message: currentTime });
  });
  app.get('/hello/:id?', (req, res) => {
    const { id } = req.params;
    if (id) {
      res.status(200).json({ status: 200, message: `Hello, ${id}` });
    } else {
      res.status(200).json({ status: 200, message: 'Hello!' });
    }
  });
  
  // Route to respond with a search query or an error message

  app.get('/search', (req, res) => {
    const { s } = req.query;
    if (s) {
      res.status(200).json({ status: 200, message: 'ok', data: s });
    } else {
      res.status(500).json({ status: 500, error: true, message: 'you have to provide a search' });
    }
  });
// Users array
const users = [
  { username: 'John', password: '1234' },
  { username: 'Jane', password: '5678' }
];

 const movies = [
 { id: 1, title: 'Jaws', year: 1975, rating: 8 },
  { id: 2, title: 'Avatar', year: 2009, rating: 7.8 },
  { id: 3, title: 'Brazil', year: 1985, rating: 8 },
   { id: 4, title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
 ];
  
// Route of movies
app.get('/movies/read', (req, res) => {
  res.status(200).json({ status: 200, data: movies });
});
//creating movie
app.get('/movies/create', (req, res) => {
  res.status(200).json({ status: 200, message: 'Create movie route' });
});
//update the movie
//app.get('/movies/update', (req, res) => {
 // res.status(200).json({ status: 200, message: 'Update movie route' });});
 app.get('/movies/update/:id', (req, res) => {
  const { id } = req.params;
  const { title, year, rating } = req.query;

  // Find the movie with the specified ID
  const movieToUpdate = movies.find((movie) => movie.id === parseInt(id));

  if (!movieToUpdate) {
    return res.status(404).json({ status: 404, error: true, message: `the movie ${id} does not exist` });
  }

  
  if (title !== undefined) {
    movieToUpdate.title = title;
  }
  if (year !== undefined) {
    movieToUpdate.year = parseInt(year);
  }
  if (rating !== undefined) {
    movieToUpdate.rating = parseFloat(rating);
  }

  res.status(200).json({ status: 200, data: movieToUpdate });
});

//delete the movie
//app.get('/movies/delete', (req, res) => {
 // res.status(200).json({ status: 200, message: 'Delete movie route' });
//});
app.get('/movies/delete/:id', (req, res) => {
  const { id } = req.params;

  // Find the movie with the specified ID
  const movieToDelete = movies.find((movie) => movie.id === parseInt(id));

  if (!movieToDelete) {
    res.status(404).json({ status: 404, error: true, message: `the movie ${id} does not exist` });
    return;
  }

  // the updatedMovies is a new variable for all Id without the targeted id 
  const updatedMovies = movies.filter((movie) => movie.id !== parseInt(id));

  // Update the movies array
  movies.length = 0; 
  movies.push(...updatedMovies); 

  // Respond with the updated list of movies
  res.status(200).json({ status: 200, data: movies });
});

//  movies ordered by date
app.get('/movies/read/by-date', (req, res) => {
  const moviesByDate = movies.slice().sort((a, b) => a.year - b.year);
  res.status(200).json({ status: 200, data: moviesByDate });
});

//  movies ordered by rating
app.get('/movies/read/by-rating', (req, res) => {
  const moviesByRating = movies.slice().sort((a, b) => b.rating - a.rating);
  res.status(200).json({ status: 200, data: moviesByRating });
});

//  movies ordered by title
app.get('/movies/read/by-title', (req, res) => {
  const moviesByTitle = movies.slice().sort((a, b) => a.title.localeCompare(b.title));
  res.status(200).json({ status: 200, data: moviesByTitle });
});

// Route to retrieve a movie by ID
app.get('/movies/read/id/:id', (req, res) => {
  const { id } = req.params;

  // Find the movie with the specified ID in the array, in my case I define "m" (m)as a placeholder for the individual elements in the movie array 
  const movie = movies.find((m) => m.id === parseInt(id));

  if (movie) {
    res.status(200).json({ status: 200, data: movie });
  } else {
    res.status(404).json({ status: 404, error: true, message: `the movie ${id} does not exist` });
  }
});
//add to the movie 
//defining a route to handle url
app.use(express.urlencoded({ extended: true }));

// Route to add a new movie
app.post('/movies/add', (req, res) => {
  const { title, year, rating } = req.query;

  // Check if title and year are provided
  if (!title || !year) {
    res.status(403).json({ status: 403, error: true, message: 'you cannot create a movie without providing a title and a year' });
    return;
  }
// Check if year/rating is a 4-digit number
const parsedYear = parseInt(year);
if (isNaN(parsedYear) || parsedYear < 1000 || parsedYear > 9999) {
  res.status(403).json({ status: 403, error: true, message: 'you cannot create a movie without providing a valid 4-digit year' });
  return;
}


  const parsedRating = rating || 4;

  const newMovie = {
    id: movies.length + 1,
    title,
    year: parseInt(year),
    rating: parseFloat(parsedRating)
  };


  // Middleware to authenticate users
  function authenticateUser(req, res, next) {
    const { username, password } = req.query;
  
    // Check if the user is in the users array
    const user = users.find((u) => u.username === username && u.password === password);
  
    if (user) {
      req.user = user;
      next(); 
    } else {
      res.status(401).json({ status: 401, error: true, message: 'Authentication failed' });
    }
  }
  
  // Middleware to check if the user is authenticated before modifying or deleting movies
  function checkAuthentication(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.status(401).json({ status: 401, error: true, message: 'Authentication required' });
    }
  }
  
  // Use middleware to parse JSON requests
  app.use(express.json());
 
  app.post('/users', (req, res) => {
    const { username, password } = req.body;
  
    // Check if the username is already taken
    if (users.some((u) => u.username === username)) {
      return res.status(400).json({ status: 400, error: true, message: 'Username already exists' });
    }
  
    // Create a new user
    const newUser = { username, password };
    users.push(newUser);
    res.status(201).json({ status: 201, data: newUser });
  });
  
  // Secure route for modifying movies
  app.put('/movies/update/:id', authenticateUser, checkAuthentication, (req, res) => {
  
  });
  
  // Secure route for deleting movies
  app.delete('/movies/delete/:id', authenticateUser, checkAuthentication, (req, res) => {
  
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
  // Add the new movie to the movies array
  movies.push(newMovie);
  res.status(200).json({ status: 200, data: movies });
});


 