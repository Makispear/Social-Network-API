const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+\@.+\..+/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'   
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)

UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((totalFriends, friend) => totalFriends + friend, 0);
});

const User = model('User', UserSchema)

module.exports = User