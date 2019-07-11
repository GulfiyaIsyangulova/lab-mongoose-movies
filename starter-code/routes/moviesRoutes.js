const express = require('express');
const router  = express.Router();
const Movie    = require('../models/Movie');
const Celebrtity = require('../models/Celebrity');
const ensureLogin = require("connect-ensure-login");





router.get('/movies',ensureLogin.ensureLoggedIn("/login"), (req, res, next)=>{
console.log(req.session.currentUser);
// if(!req.session.currentUser){
//     res.redirect('/login')
// }
    Movie.find()
    .then((allMovies)=>{
        res.render('movies/bunchaMovies', {movies: allMovies})
    })
    .catch((err)=>{
        next(err);
    })
})

router.get('/movies/detail/:idOfMovie', (req, res, next)=>{
   Movie.findById(req.params.idOfMovie)
    .then((oneSingleMovie)=>{
        res.render('movies/movieDetail', {theMovie:oneSingleMovie})
    })
    .catch((err)=>{
        next(err);
    })
})
router.get('/movies/new', (req, res, next)=>{
    Celebrtity.find()
    .then((allTheCelebrities)=>{
        console.log(allTheCelebrities);
        res.render('movies/newMovie', {actor: allTheCelebrities})
    })
    .catch((err)=>{
        console.log(err);
        next(err);
    })
    // res.render('movies/newMovie');

})
router.post('/movies/create-new-movie', (req, res, next)=>{
    const {theTitle, theGenre, thePlot} = req.body;
    
    let newMovie = {title: theTitle, genre: theGenre,
         plot: thePlot }

    Movie.create(newMovie)
    .then(()=>{
        res.redirect('/movies')
    })
    .catch((err)=>{
        next(err);
    })
})

router.get('/movies/edit/:id', (req, res, next)=>{
    Movie.findById(req.params.id)
    .then((movieFromDb)=>{
            res.render('movies/editMovieInfo', {movie: movieFromDb})
    })
    .catch((err)=>{
        next(err);
    })
})


router.post('/movies/update/:movieID', (req, res, next)=>{
    let theID = req.params.movieID;
    Movie.findByIdAndUpdate(theID, req.body)
    .then((movie)=>{
        res.redirect('/movies/detail/'+theID)
    })
    .catch((err)=>{
        next(err);
    })
})




module.exports = router;