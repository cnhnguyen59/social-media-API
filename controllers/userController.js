const { User, Thought } = require('../models');

module.exports = {
    //gets all users
    getUsers(req, res) {
      User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json({message:'Error getting all users'}));
    }
    /* getUsers(req,res) {
        User.find({}, (err, result)=>{
          if(result){
            res.status(200).json(result);
          } else {
            console.log('Error grabbing all users')
          }
        })
     } */,
    //gets single user
    getSingleUser(req,res){
        User.findOne({_id:req.params.userId})
            .select('-__v')
            .then((user)=>{
                !user
                    ? res.status(404).json({message:'No user with that ID'})
                    : res.json(user)
            })
            .catch((err)=> res.status(500).json(err))
    },
    //creates new user
    createUser(req, res) {
        User.create(req.body)
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => res.status(500).json(err));
      },
    //delete user and associated thoughts
   /*  deleteUser(req, res) {
      User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : Thought.deleteMany({ _id: { $in: user.thoughts } })
        )
        .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
        .catch((err) => res.status(500).json(err));
    },
     */
    deleteUser(req, res) {
      User.findOneAndDelete({_id:req.params.userId})
        .then((user)=>
          !user 
            ? res.status(404).json({message:'No user with that ID'})
            : Thought.deleteMany({ _id: { $in:user.thoughts } })
        )
        .then(() => res.json({message:'User and associated thoughts deleted!'}))
        .catch((err)=> res.status(500).json(err))
    },
    //update user data
    updateUser(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((user)=>{
          !user
            ? res.status(400).json({message:'No user with that ID'})
            : res.status(200).json(user)
        })
        .catch((err)=>{
          if (err) res.status(500).json({message: 'Error updating user'})
        })
    }
}