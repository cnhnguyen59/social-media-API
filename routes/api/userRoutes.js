const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser
} = require('../../controllers/userController')

const {
    addFriend,
    deleteFriend
} = require('../../controllers/friendsController')


//route: /api/users
router.route('/').get(getUsers).post(createUser);
//route: /api/users/:usersId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser)
//route: /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)



module.exports = router;
