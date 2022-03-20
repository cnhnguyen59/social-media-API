const{ Thought, User} = require('../models');

module.exports = {
    getThoughts(req,res){
        Thought.find()
            .then((thoughts)=>res.json(thoughts))
            .catch((err)=>res.status(500).json(err))
    },
    getSingleThought(req,res){
        Thought.findOne({ _id: req.params.postId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No post with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
    },
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
      }

}