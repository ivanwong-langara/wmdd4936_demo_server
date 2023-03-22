const express = require('express');
const router = express.Router({mergeParams:true});
const characterRouter = require('./characters');
const locationRouter = require('./locations');

router.use(locationRouter);
router.use(characterRouter);

module.exports = router;
