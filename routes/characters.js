const express = require('express');
const router = express.Router({mergeParams:true});
const characterController = require('../controllers/characterController');     


router.get('/:type/:id', characterController.getCharacter);
//Get a hero based on its ID. 
router.get('/:type', characterController.getCharacter);
//Get an array of all heroes. 
router.post('/:type', characterController.saveCharacter);
//Create a new hero

module.exports = router;