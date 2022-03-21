const{ User, Thought, Reaction } = require('../models')

module.exports = {
    postReaction(req,res){
        Reaction.create(req.body)
          .then((reaction) => {
            return Thought.findOneAndUpdate(
              { _id: req.params.thoughtId },
              { $addToSet: { reactions: reaction._id } },
              { new: true }
            );
          })
            .then((thought)=>
            !thought
                ? res.status(404).json({message:"No thought associated with that ID"})
                : res.status(200).json(thought)
            )
            .catch((err) => {
                console.log(err)
                res.status(500).json("Error posting reaction")
                }
            )
    },
    deleteReaction(req,res){
        Reaction.findOneAndRemove({_id:req.body.reactionId})
            .then((reaction)=> 
            !reaction 
                ? res.status(404).json({message:"No reaction associated with that ID"})
                : Thought.findOneAndUpdate(
                    {thoughts: req.params.thoughtId},
                    {$pull: {reactions:req.body.reactionId}},
                    {new:true}
                )
            .then((thought)=>
                !thought
                    ? res.status(404).json({message:'No thought associated with that ID'})
                    : res.status(200).json({message:"Reaction deleted!"}))
            )
            .catch((err)=> res.status(500).json(err))

    }
    
}