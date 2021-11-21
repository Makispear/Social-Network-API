const { Schema, model } = require('mongoose')


const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            // default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
            // place getter here for formatting date
        }
    }
)

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
            default: Date.now
            // place getter here for formatting date 
        },
        username: {
                type: Schema.Types.ObjectId,
                ref: 'User'
        }
        ,
        reactions: [reactionSchema]
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