const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    postThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtController')

const {
    postReaction,
    deleteReaction
} = require('../../controllers/reactionController')

// /api/thoughts
router.route('/').get(getThoughts).post(postThought)
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)

// /api/thoughts/:thoughsId
router.route('/:thoughtId/reactions').post(postReaction).delete(deleteReaction)

module.exports = router