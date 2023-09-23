import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Stack, CircularProgress, IconButton, Skeleton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import axios from 'axios';

const ViewStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [upvotedStories, setUpvotedStories] = useState(new Set());

  // Fetch stories from the API
  const fetchStories = async () => {
    try {
      const response = await axios.get(`/api/getStories`);
      setStories(response.data.stories);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stories', error);
    }
  };

  // Function to handle upvote for a story
  const handleVote = async (storyId, voteValue) => {
    try {
      // Update the local state first for a smooth UI transition
      setStories((prevStories) =>
        prevStories.map((story) =>
          story._id === storyId
            ? { ...story, upvote: story.upvote + voteValue }
            : story
        )
      );

      if (voteValue === 1) {
        // If voting up, mark the story as upvoted
        setUpvotedStories((prevUpvotedStories) =>
          new Set(prevUpvotedStories).add(storyId)
        );
      } else if (voteValue === -1) {
        // If voting down, remove the story from upvoted stories
        setUpvotedStories((prevUpvotedStories) => {
          const updatedUpvotedStories = new Set(prevUpvotedStories);
          updatedUpvotedStories.delete(storyId);
          return updatedUpvotedStories;
        });
      }

      // Call the API to update the vote
      await axios.post(`/api/storyUpvote`, {
        _id: storyId,
        vote: voteValue,
      });
    } catch (error) {
      console.error('Error updating vote:', error);

      // Revert the local state change if there's an error
      setStories((prevStories) =>
        prevStories.map((story) =>
          story._id === storyId
            ? { ...story, upvote: story.upvote - voteValue }
            : story
        )
      );
    }
  };

  // Fetch stories when the component mounts
  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div>
      {loading ? (
        <div className='flex flex-col items-center'>
          <Skeleton animation="wave" className='w-[90%] h-16' />
          <Skeleton animation="wave" className='w-[90%] h-16' />
          <Skeleton animation="wave" className='w-[90%] h-16' />
          <Skeleton animation="wave" className='w-[90%] h-16' />
          <Skeleton animation="wave" className='w-[90%] h-16' />
          <Skeleton animation="wave" className='w-[90%] h-16' />
        </div>
      ) : (
        <div className='flex justify-center'>
          <Stack spacing={2} className='w-[90%]'>
            {stories.map((story) => (
              <Accordion key={story._id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel-${story._id}-content`}
                  id={`panel-${story._id}-header`}
                >
                  <div className="flex flex-row items-center justify-between w-full pr-4">
                    <Typography>{story.prompt}</Typography>
                    <div className="dark-theme flex items-center">
                      {upvotedStories.has(story._id) ? (
                        <IconButton
                          onClick={() => handleVote(story._id, -1)}
                          color='default'
                        >
                          <ThumbUpIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() => handleVote(story._id, 1)}
                          color='default'
                        >
                          <ThumbUpOffAltIcon />
                        </IconButton>
                      )}
                      <Typography>{`${story.upvote}`}</Typography>
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails className='px-10 text-justify'>
                  <Typography>{story.tale}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </div>
      )}
    </div>
  );
};

export default ViewStories;
