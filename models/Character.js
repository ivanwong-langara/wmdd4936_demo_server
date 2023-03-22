const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    name: { type: String, required: true, maxLength: 30 },
    powers: { type: [String], default: ["Super strength"], set: stringToArray },
    type: { type: String, enum: ['hero', 'villain'], default: 'hero' },
    hp: { type: Number, default: 1 },
}
/*
,
    {
        statics: {
            findByType(type) {
                return this.find({ type });
            }
        }
    }
*/
);

CharacterSchema.virtual('description').get(function () {
    if (this.type == 'hero') {
        let str = `${this.name} is a nobel hero whose special powers are `;
        str += this.powers.join(', ');
        return str;
    } else if (this.type == 'villain') {
        let str = `${this.name} is a nefarious villain whose special powers are `;
        str += this.powers.join(', ');
        return str;
    }
    return "";
});


CharacterSchema.static('findByType', function (type) {
    console.log("FindByType:" + type);
    return this.find({ type });
}
);


function stringToArray(powerString) {
    return powerString.split(",").map(
        str => str.trim());
    //    return powerString.split(",");
}

const Character = mongoose.model("Character", CharacterSchema);

module.exports = Character;