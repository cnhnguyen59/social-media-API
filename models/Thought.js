const { Schema, model} = require('mongoose');

const thoughtSchema = new Schema({
    body:{type: String, required:true},
    created_at: {type: Date, default: ()=> Date.now(), immutable: true},
    updated_at: {type: Date, default: () => Date.now()},
    reactions: [{
        type:Schema.Types.ObjectId,
        ref:'reaction'
    }
    ]
})

const Thought = model('thought', thoughtSchema)

module.exports = Thought;