import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Alert from './Alert.js';

const marks = [
  {
    value: 100,
    label: '100 words',
  },
  {
    value: 1000,
    label: '1000 words',
  },
];

const GenerateStory = () => {
  const [prompt, setPrompt] = useState('');
  const [length, setLength] = useState(150);
  const [loading, setLoading] = useState(false); // Track loading state
  const [response, setResponse] = useState(''); // Store API response
  const [alert, setAlert] = useState(null);

  const handleApiError = (error) => {
    setAlert({ type: 'error', message: error.message });
  };

  const handlePostClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`/api/postStory`, { prompt: prompt, tale: response, upvote: 0 });
      setResponse('');
      setAlert({ type: 'success', message: 'Your story is posted successfully!!' });
    } catch (error) {
      handleApiError(error); // Handle the error and set the alert message
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };
  const handleLengthChange = (event) => {
    setLength(event.target.value);
  };

  const handleGenerateClick = async (e) => {
    e.preventDefault();
    setResponse('');
    setLoading(true); // Start loading indicator

    try {
      const queryParams = {};
      queryParams.body = prompt;

      const assistantResponse = await axios.post(`/api/openai`, { prompt: prompt, length: length });

      if (assistantResponse.data.error) {
        throw new Error(assistantResponse.data.error);
      }

      setResponse(assistantResponse.data); // Store the API response
      setAlert({ type: 'info', message: 'Story is generated!' });
    } catch (error) {
      handleApiError(error); // Handle the error and set the alert message
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  const handleResetClick = (event) => {
    setPrompt('');
    setResponse(''); // Reset response
    setAlert(null); // Reset error
  };

  return (
    <div className='flex flex-col justify-center p-10 items-center'>
      <FormControl className='w-[80%]'>
        <InputLabel htmlFor="component-outlined">Prompt</InputLabel>
        <OutlinedInput
          id="component-outlined"
          defaultValue=""
          label="Prompt"
          value={prompt}
          onChange={handlePromptChange}
          focused
        />
      </FormControl>
      <div className='w-[80%] flex items-center mb-10 '>
        <div className='w-[40%]'>Desired length of your story </div>
        <Slider
          aria-label="Choose the length of your story"
          defaultValue={250}
          step={50}
          marks={marks}
          min={100}
          max={1000}
          valueLabelDisplay="auto"
          className='w-1/2 mt-5'
          value={length}
          onChange={handleLengthChange}
        />
      </div>
      <div className='flex flex-row justify-between w-[80%]'>
        <div>
          {response && response.trim() !== "" && (
            <Button
              variant="contained"
              color="success"
              className='bg-[#f2c2c2] m-5 hover:bg-[#ee9e9e]'
              onClick={handlePostClick}
            >
              Post the story
            </Button>
          )}
        </div>
        <div className='flex flex-row items-end justify-end'>
          <Button
            variant="contained"
            color="success"
            className='bg-green-300 m-5 w-min'
            onClick={handleGenerateClick}
          >
            Generate
          </Button>
          <Button
            variant="outlined"
            color="error"
            className='m-5 w-min'
            onClick={handleResetClick}
          >
            Reset
          </Button>
        </div>

      </div>


      {/* Loading indicator */}
      {loading && <CircularProgress />}

      {/* Display API response */}
      {response && (
        <TextField
          label="Response"
          variant="outlined"
          fullWidth
          multiline
          value={response}
          readOnly
          className="mt-4"
        />
      )}

      {/* Display API error */}
      {alert && <div className='fixed bottom-5 m-2'><Alert message={alert.message} type={alert.type} time={5000} /></div>}
    </div>

    
  );
};

export default GenerateStory;
