const express = require('express');
const router = require('express').Router({mergeParams:true});
const locationController = require('../controllers/locationController'); 

router.get('/locations/:id', locationController.getLocation);

router.get('/locations', locationController.getLocation);

router.post('/locations', locationController.saveLocation);

module.exports = router;