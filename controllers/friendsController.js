const { User } = require ('../models')

module.exports = {
    // Add friend
    addFriend(req, res){
        User.findOneAndUpdate(
            {_id:req.params.userId},
            { $addToSet: { friends: req.params.friendId}},
            { new:true }
        )
        .then((user)=>
        !user
            ? res.status(404).json({message: "No user associated with that ID"})
            : User.findOneAndUpdate(
                {_id:req.params.friendId},
                { $addToSet: { friends: req.params.userId}},
                { new:true }
            )
        )
        .then((user)=>
        !user
            ? res.status(404).json({message: "No user associated with that ID"})
            : res.status(200).json({message:"Friend added!"})
        )
        .catch((err)=> res.status(500).json({message:"Error adding friend"})
        )
    },
    //Delete friend
    deleteFriend(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull:{friends: req.params.friendId}},
            { new:true }
        )
        .then((user)=>
        !user
            ? res.status(404).json({message:"No user associated with that id"})
            :  User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $pull:{friends: req.params.userId}},
                { new:true }
            )
        )
        .then((user)=>
        !user
            ? res.status(404).json({message:"No user associated with that id"})
            : res.status(200).json({message:"Friend deleted"}))
        .catch((err)=> res.status(500).json({message:"Error deleting friend"}))
    }
    
}