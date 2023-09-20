const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    prompt : {type: String},
    tale :  {type: String},
    upvote : {type: Number, default: 1}
}, {timestamps: true});

export default mongoose.model("Story", storySchema);