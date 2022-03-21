const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    postThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtController')

// /api/thoughts
router.route('/').get(getThoughts).post(postThought)
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)

module.exports = router