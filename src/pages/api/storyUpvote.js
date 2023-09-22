import story from "@/models/story"
import connectDb from "../../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { _id, vote } = req.body;

        try {
            // Define the update object based on the 'vote' variable
            const updateObject =
                vote === 1 ? { $inc: { upvote: 1 } } :
                vote === -1 ? { $inc: { upvote: -1 } } : {};

            if (!Object.keys(updateObject).length) {
                return res.status(400).json({ message: 'Invalid vote value' });
            }

            const updatedStory = await story.findByIdAndUpdate(
                _id,
                updateObject,
                { new: true }
            );

            if (!updatedStory) {
                return res.status(404).json({ message: 'Story not found' });
            }

            return res.status(200).json(updatedStory);
        } catch (error) {
            console.error('Error updating story:', error);
            return res.status(500).json({ message: 'Server error' });
        }

    }
    else {
        res.status(405).end(); // Method not allowed
    }
}

export default connectDb(handler);
