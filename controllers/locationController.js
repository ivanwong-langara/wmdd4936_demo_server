const { response } = require('express');
const express = require('express');

Location = require("../models/Location");

const getLocation = (req, res) => {
    const id = req.params.id;
    if (typeof (id) !== "undefined") {
        Location.findOne({ "_id": id })
            .exec()
            .then(results => {
                res.status(200)
                    .json(results);
            })
            .catch((error) => {
                res.status(500)
                    .json(error);
            })
    } else {
        Location.find({})
            .exec()
            .then(results => {
                res.status(200)
                    .json(results);
            })
            .catch(error => {
                res.status(500)
                    .json(error);
            })

    }
};

const saveLocation = (req, res) => {
    let location = new Location(req.body);
    location.save()
        .then(results => {
            const id = results._id;
            res.set('content-location', res.url)
                .status(200)
                .json({
                    url: `/api/v1/locations/${id}`,
                    data: results
                });
        })
        .catch(error => {
            res.status(500)
                .json(error);
        });
};

module.exports = {
    getLocation,
    saveLocation
};
