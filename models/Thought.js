const { Schema, model} = require('mongoose');

const thoughtSchema = new Schema({
    body:{type: String, required:true},
    created_at: {type: Date, default: ()=> Date.now(), immutable: true},
    updated_at: {type: Date, default: () => Date.now()}
})

const Thought = model('thought', thoughtSchema)

module.exports = Thought;