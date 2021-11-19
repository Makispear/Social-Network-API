const { Schema, model } = require('mongoose')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280
        },
        createdAt: {
            type: Date,
            default: date.now
            // place getter here for formatting date 
        },
        username: {
            type: String,
            required: true
        },
        reactions: [
            [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'reaction'
                }
            ]
        ]
    },
    {
        toJSON: {
            virtuals: true
            // uncomment after placing getter
            // getters: true 
        }
    }
)

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.reduce((totalReactions, reaction) => totalReactions + reaction, 0);
});

const Thought = model('Thought', thoughtSchema)

module.exports = Thought