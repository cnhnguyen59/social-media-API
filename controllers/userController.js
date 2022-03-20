const User = require('../models/User');

module.exports = {
    //gets all users
    getUsers(req,res) {
        User.find({}, (err, result)=>{
          if(result){
            res.status(200).json(result);
          } else {
            console.log('Error grabbing all users')
          }
        })
     },
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
        console.log(req.body)
        User.create(req.body)
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => res.status(500).json(err));
      },
}