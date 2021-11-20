const { Thought } = require('../models')
const thought404Message = (id) => `Thought with ID: ${id} not found!`

const thoughtController = {
    // get all thoughts 
    getAllThoughts(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(400).json(err))
    },

    // get one thought by ID
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .select('-__v')
        .then(dbThoughtData =>  dbThoughtData ? res.json(dbThoughtData) : res.status(404).json({ message: thought404Message(params.id) }))
        .catch(err => res.status(404).json(err))
    },

    // add a thought
    createThought({ body }, res) {
        Thought.create(body)
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(400).json(err))
    },

    // update thought info 
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtData =>  dbThoughtData ? res.json(dbThoughtData) : res.status(404).json({ message: thought404Message(params.id) }))
        .catch(err => res.status(400).json(err))
    },

    // delete thought 
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData =>  dbThoughtData ? res.json(dbThoughtData) : res.status(404).json({ message: thought404Message(params.id) }))
        .catch(err => res.status(404).json(err))
    },

    // add a friend to thought
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, { $push: { reactions: body } }, { new: true, runValidators: true })
        .then(dbThoughtData =>  dbThoughtData ? res.json(dbThoughtData) : res.status(404).json({ message: thought404Message(params.id) }))
        .catch(err => res.status(404).json(err))
    },
}

module.exports = thoughtController