
const mongoose = require('mongoose')

const SkillSchema = new mongoose.Schema({
    file: [
        {
            fileName: String,
            path: String
        },
    ],
    skill: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    }
})

const Skill = mongoose.model('skill',SkillSchema);

module.exports = Skill;
