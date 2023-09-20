const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    uid : {type: Number},
    prompt : {type: String},
    tale :  {type: String},
    upvote : {type: Number, default: 1}
}, {timestamps: true});

mongoose.models = {};
export default mongoose.model("Story", storySchema);