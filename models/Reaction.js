const {Schema, model} = require('mongoose');

const reactionSchema = new Schema({
    body:{ type: String, required:true },
    username:{ type:String, required:true },
    created_at: {type: Date, default: ()=> Date.now(), immutable: true}
})

const Reaction = model('reaction', reactionSchema)

module.exports = Reaction;