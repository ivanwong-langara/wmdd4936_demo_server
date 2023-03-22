Character = require("../models/Character");

const getCharacter = (req, res) => {
    const type = req.params.type;
    const id = req.params.id;
    if (typeof(id) !== "undefined") {
        Character.findOne({ "_id": id })
            .exec()
            .then(results => {
                const result = {
                    _id: results._id,
                    name: results.name,
                    powers: results.powers,
                    type: results.type,
                    hp: results.hp,
                    description: results.description
                };
                res.status(200)
                    .json(result);
            })
            .catch(error => {
                res.status(500)
                    .json(error);
            })
    } else {
        const t = (type == 'heroes' ? 'hero' : 'villain');
        let c = Character.findByType(t);
//        console.log("C::" + c);
        Character.findByType(t)
            .exec()
            .then(results => {
                console.log(results);
                const result = {
                    _id: results._id,
                    name: results.name,
                };
                res.status(200)
                    .json(results.map(({_id, name}) => {return {_id, name}}));
            })
            .catch(error => {
                res.status(500)
                    .json(error);
            })

    }
};

const saveCharacter = (req, res) => {
    const type = req.params.type == 'heroes' ? 'hero' : (req.params.type == 'villains' ? 'villain' : "");
    req.body.type = type;
    let character = new Character(req.body);
    character.save()
        .then(results => {
            const id = results._id;
            res.set('content-location', res.url)
                .status(200)
                .json({
                    url: `/api/v1/${type}/${id}`,
                    data: results
                });
        })
        .catch(error => {
            res.status(500)
                .json(error);
        });
};

module.exports = {
    getCharacter,
    saveCharacter
};