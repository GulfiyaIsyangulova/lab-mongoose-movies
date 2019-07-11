const mongoose     = require('mongoose');
const Movie       = require('../models/Movie');

mongoose
  .connect('mongodb://localhost/celebritys-app', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });
  

  const blah = [
      {
          title: "Titanic",
          genre: "drama",
          plot: "But don't worry... only yours is right."
      },
      {
        title: "Pianist",
        genre: "drama",
        plot: "Eat your vitamins and say your prayers"
      },
     
      {
        name: "7",
       genre: "comedia",
        plot: "I don't get no respect!"
      },
     
      {
       title: "Anabel",
       genre: "horror",
       plot: "I pity the fool."
      }
  ];

  Movie.create(blah)
  .then(()=>{
      console.log('it worked')
  })
  .catch(()=>{
      console.log('it didnt work')
  })