const{ User, Thought, Reaction } = require('../models')

module.exports = {
    postReaction(req,res){
        Thought.findOneAndUpdate(
            { _id:req.params.id },
            { $addToSet: {reactions: req.body.body} },
            { username: req.body.username },
            { new: true}
        )
        .then((thought)=>
        !thought
            ? res.status(404).json({message:"No thought associated with that ID"})
            : res.stauts(200).json(thought)
        )
        .catch((err) => res.status(500).json("Error posting reaction"))
    }
}