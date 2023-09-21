import story from "@/models/story"
import connectDb from "../../../middleware/mongoose"

 const  handler = async (req,res) => {
    if(req.method == 'POST'){
        if(req.body.prompt.trim()==="" || req.body.tale.trim()===""){
            res.status(402).json({error:"Failed! Your prompt is empty!"});
        }
        let s = new story({
            uid : req.body.uid,
            prompt : req.body.prompt,
            tale :  req.body.tale,
            upvote : req.body.upvote,
        })
        await s.save();
    }
    else{
        res.status(400).json({error:"This method is not allowed"});
    }
    let st = await story.find();
    res.status(200).json({st});
}

export default connectDb(handler);
  