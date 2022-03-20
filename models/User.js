const {Schema, model} = require('mongoose');

/* const thoughtSchema = new mongoose.Schema({
    body:{type: String, required:true},
    created_at: {type: Date, required: true}
}) */

const userSchema = new Schema({
    username:{type: String, required: true},
    email: {type: String, required: true},
    thoughts:[{
        type: Schema.Types.ObjectId,
        ref: 'thought'
    }],
    friends:[{
        type: Schema.Types.ObjectId,
        ref: 'user'
      }]
})

const User = model('user', userSchema)


module.exports = User;