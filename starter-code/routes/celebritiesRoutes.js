const express = require('express');
const router  = express.Router();
const Celebrtity    = require('../models/Celebrity');


router.get('/celebrities', (req, res, next)=>{
    Celebrtity.find()
    .then((allTheCelebrities)=>{
        console.log(allTheCelebrities);
        res.render('celebrities', {celebrities: allTheCelebrities})
    })
    .catch((err)=>{
        console.log(err);
        next(err);
    })
})
router.get('/celebrities/detail/:idOfCelebrity', (req, res, next)=>{
    Celebrtity.findById(req.params.idOfCelebrity)
    .then((oneSingleCelebrity)=>{
        res.render('celebrities/celebrityDetails', {theCelebrity:oneSingleCelebrity})
    })
    .catch((err)=>{
        next(err);
    })
})

router.get('/celebrities/new', (req, res, next)=>{
    res.render('celebrities/newCelebrity');

})

router.get('/celebrities/edit', (req, res, next)=>{
    res.render('celebrities/editCelebrityInfo');

})

router.post('/celebrities/create-new-celebrity', (req, res, next)=>{
    const {theName, theOccupation, thePhrase} = req.body;
    
    let newCelebrity = {name: theName, occupation: theOccupation,
         phrase: thePhrase }

    Celebrtity.create(newCelebrity)
    .then(()=>{
        res.redirect('/celebrities')
    })
    .catch((err)=>{
        next(err);
    })
})
router.post('/celebrities/delete/:id', (req, res, next)=>{

    Celebrtity.findByIdAndRemove(req.params.id)
    .then(()=>{
        res.redirect('/celebrities');
    })
    .catch((err)=>{
        next(err);
    })


})

router.get('/celebrities/edit/:id', (req, res, next)=>{
    Celebrtity.findById(req.params.id)
    .then((celebrityFromDb)=>{
            res.render('celebrities/editCelebrityInfo', {celebrity: celebrityFromDb})
    })
    .catch((err)=>{
        next(err);
    })
})
router.post('/celebrities/update/:celebrityID', (req, res, next)=>{
    let theID = req.params.celebrityID;
   
    Celebrtity.findByIdAndUpdate(theID, req.body)
    
    .then((apple)=>{
        res.redirect('/celebrities/detail/'+theID)
    })
    .catch((err)=>{
        next(err);
    })
})






module.exports = router;