const{ Thought, User} = require('../models');

module.exports = {
  //get all thoughts
    getThoughts(req,res){
        Thought.find()
            .then((thoughts)=>res.json(thoughts))
            .catch((err)=>res.status(500).json(err))
    },
    //get thought but its id
    getSingleThought(req,res){
        Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
    },
    //post thought
    postThought(req, res) {
        Thought.create(req.body)
          .then((thought) => {
            return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $addToSet: { thoughts: thought._id } },
              { new: true }
            );
          })
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'Thought posted, but found no user with that ID' })
              : res.json('Thought posted!')
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
    //update thought by its id
    updateThought(req,res){
      Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$set:req.body},
        { runValidators: true, new:true}
      )
        .then((thought)=>{
          console.log(req.params.id)
          !thought
            ? res.status(400).json({message: "No thought with that ID"})
            : res.status(200).json(thought)
        })
        .catch((err)=>{
          if (err) res.status(500).json({message:"Error updating thought"})
        }) 
    },
    // delete thought by id
    deleteThought(req, res){
      Thought.findOneAndRemove({_id:req.params.thoughtId})
        .then((thought)=>{
          !thought
            ? res.status(400).json({message:'No thought associated with that ID'})
            : User.findOneAndUpdate(
              {thoughts: req.params.thoughtId},
              {$pull: {thoughts: req.params.thoughtId}},
              {new: true}
            )
        })
        .then((user)=>{
          !user
            ? res.status(404).json({
              message: 'Thought from unknown user ID deleted'
            })
            : res.status(200).json({message:'Thought deleted!'})
        })
        .catch((err)=>{
          if (err) res.status(500).json({message: 'Error deleting thought'})
        })
    }
}
