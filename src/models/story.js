const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    prompt : {type: String},
    tale :  {type: String},
    upvote : {type: Number, default: 0}
}, {timestamps: true});

mongoose.models = {};
export default mongoose.model("Story", storySchema);