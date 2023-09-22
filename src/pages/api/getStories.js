import story from "@/models/story"   
import connectDb from "../../../middleware/mongoose"

 const  handler = async (req,res) => {
    let stories = await story.find();
    res.status(200).json({stories});
}

export default connectDb(handler);