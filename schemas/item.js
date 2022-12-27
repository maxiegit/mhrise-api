const mongoose = require('mongoose');


const itemSchema = new mongoose.Schema({
    img:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rank: {
        type: [String],
        required: false
    },
    quests: {
        type: [{
            name: String,
            rarity: String,
            quantity: Number,
            chance: Number
        }],
        required: false
    },
    sources: {
        type: [
            {
            monster: String,
            rank: String,
            source: String,
            quantity: Number,
            chance: Number
        }
    ],
        required: false
    },
    weapons: {
        type: [
            {
                name: String,
                weaponType: String,
                requiredForCraft: Number
            }
        ],
        required: false
    },
    armor: {
        type: [
            {
                name: String,
                armorType: String,
                requiredForCraft: Number
            }
        ],
        required: false
    },
    local: {
        type: [
            {
                name: String,
                rank: String,
                quantity: Number,
                chance: Number
            }
        ],
        required: false
    },
    decorations: {
        type: [
            {
                name: String,
                requiredForCraft: Number
            }
        ],
        required: false
    },
})

module.exports = mongoose.model('itemSchema', itemSchema)