import React, { useState } from 'react';
import styles from '../styles/home.module.css'; // Import a CSS module for styling

// Import your GenerateStory and ViewStories components
import GenerateStory from '../components/GenerateStory';
import ViewStories from '../components/ViewStories';

export default function Home() {
  const [selectedOption, setSelectedOption] = useState('Generate'); 
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      {/* Option buttons */}
      <div className={styles.optionContainer}>
        <button
          className={`${styles.optionButton} ${
            selectedOption === 'Generate' && styles.selectedOption
          }`}
          onClick={() => handleOptionClick('Generate')}
        >
          Generate Story
        </button>
        <button
          className={`${styles.optionButton} ${
            selectedOption === 'View' && styles.selectedOption
          }`}
          onClick={() => handleOptionClick('View')}
        >
          View Stories
        </button>
      </div>

      {/* Render the selected component */}
      {selectedOption === 'Generate' && <GenerateStory />}
      {selectedOption === 'View' && <ViewStories />}
    </div>
  );
}
