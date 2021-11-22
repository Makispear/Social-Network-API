const { User, Thought } = require('../models')
const user404Message = (id) => `User with ID: ${id} not found!`
const user204Message = (id) => `User with ID: ${id} has been deleted!`

const userController = {
    // get all users 
    getAllUsers(req, res) {
        User.find({})
        .populate({ path: 'thoughts', select: '-__v'})
        .populate({ path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(500).json(err))
    },

    // get one user by ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({ path: 'friends', select: '-__v' })
        .populate({ path: 'thoughts', select: '-__v', populate: { path: 'reactions'}})
        .select('-__v')
        .then(dbUserData =>  dbUserData ? res.json(dbUserData) : res.status(404).json({ message: user404Message(params.id) }))
        .catch(err => res.status(404).json(err))
    },

    // add a new user 
    createUser({ body }, res) {
        User.create({ username: body.username, email: body.email})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    },

    // update user info 
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData =>  dbUserData ? res.json(dbUserData) : res.status(404).json({ message: user404Message(params.id) }))
        .catch(err => res.status(400).json(err))
    },

    // delete user 
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({ message: user404Message(params.id) })
            }
            return dbUserData
        })
        .then(deletedUserData => {
            console.log('\n\n\n\n\n')
            console.log(deletedUserData)
            Thought.DeleteMany({ username: deletedUserData.username})
            res.json('done')
        })
        .catch(err => res.status(400).json(err))
    },

    // add a friend to user
    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.userId}, { $push: { friends: params.friendId } }, { new: true, runValidators: true })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err))
    },

    // remove a friend from user 
    removeFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.userId}, { $pull: { friends: params.friendId} })
        .then(dbUserData => res.status(204).json(dbUserData))
        .catch(err => res.json(err))
    }
}

module.exports = userController