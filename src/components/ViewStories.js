import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Stack, Button, CircularProgress, IconButton } from '@mui/material';
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
  const handleUpvote = (storyId) => {
    if (!upvotedStories.has(storyId)) {
      // You can implement the logic to send an upvote to the server here
      // For demonstration, we'll just update the local state
      setStories((prevStories) =>
        prevStories.map((story) =>
          story._id === storyId ? { ...story, upvote: story.upvote + 1 } : story
        )
      );
      // Mark the story as upvoted by adding it to the Set
      upvotedStories.add(storyId);
    }
  };

  // Fetch stories when the component mounts
  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <Stack spacing={2}>
          {stories.map((story) => (
            <Accordion key={story._id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${story._id}-content`}
                id={`panel-${story._id}-header`}
              >
                <Typography>{story.prompt}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="dark-theme">
                  <IconButton
                    onClick={() => handleUpvote(story._id)}
                    color={upvotedStories.has(story._id) ? 'primary' : 'default'}
                  >
                    {upvotedStories.has(story._id) ? (
                      <ThumbUpIcon /> // Replace with your upvote icon
                    ) : (
                      <ThumbUpOffAltIcon /> // Replace with your un-upvoted icon
                    )}
                  </IconButton>
                  <Typography>{`Upvotes: ${story.upvote}`}</Typography>
                </div>
                <Typography>{story.tale}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      )}
    </div>
  );
};

export default ViewStories;
