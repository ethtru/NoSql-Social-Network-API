const { Schema, model, Types } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (value) => value.toDateString(), //COME BACK TO FIND A .JS FUNCTION TO FORMAT A DATE
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (value) => value.toDateString(), //COME BACK TO FIND A .JS FUNCTION TO FORMAT A DATE
    },
    username: {
      type: String,
      default: true,
    },
    userId: {
      type: String,
      default: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);
const Reaction = model("reaction", reactionSchema);

module.exports = { Thought, Reaction };
