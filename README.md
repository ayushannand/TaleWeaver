
# TaleWeaver

TaleWeaver is an interactive web platform that harnesses the power of AI to generate captivating short stories based on user prompts. Users can provide story prompts, and the AI, powered by state-of-the-art text generation models, creates engaging narratives. Users can also upvote their favorite stories, which are showcased on a leaderboard.

# Live Site
[TailWeaver](https://taleweaver.vercel.app/)
Note - In this deployment, I'm using hobby version of vercel, which allows `10.01s` wait-time for API responses, and OpenAI's api frequently takes more that that, so it will throw an error in generating stories in peak hours. While you can enjoy reading other stories anytime...


## Features

- **Generate Stories**: Input a story prompt, and the AI model will create a unique short story based on your input.

- **Leaderboard**: Browse top-voted stories and their prompts on the leaderboard to discover popular narratives.

- **Dark Theme**: Enjoy a comfortable reading experience with the dark theme.

- **Customize Tone and Theme**: Tailor your story requests with specific tones or themes, and provide feedback on the generated stories.

## Getting Started

### Prerequisites

- Node.js: Make sure you have Node.js installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/TaleWeaver.git
   ```

2. Navigate to the project directory:

   ```bash
   cd TaleWeaver
   ```

3. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

### Usage

1. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Open your web browser and visit [http://localhost:3000](http://localhost:3000) to access the TaleWeaver web app.

### Configuration

To configure the OpenAI API integration, set your API key in the environment variable `OPENAI_API_KEY` in `.env.local` file in the directory.
## Tech Stack

- Frontend: NestJs + TailwindCSS + MUI
- Backend: Node.js (Express.js)
- AI Model: OpenAI's GPT-3.5-turbo
- Database: MongoDB Atlas

## Contributing

Contributions are welcome! If you'd like to contribute to TaleWeaver, fork the repo, make the changes, and create a PR with all the relevant details. Thats it! We will review it and revert back.
