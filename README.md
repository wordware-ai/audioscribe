# Audioscribe

Audioscribe is a web application that converts recordings into structured notes, utilizing Wordware as the AI Agent in the backend. This project leverages cutting-edge technologies to provide users with a seamless experience in recording, transcribing, and managing their notes.

## Setting Up the Project

To set up the Audioscribe project on your local machine, follow these steps:

1. **Clone the Repository**: Clone the Audioscribe repository from GitHub to your local machine using your preferred method (e.g., Git Bash, GitHub Desktop, or the command line).
2. **Install Dependencies**: Navigate to the project directory and run `npm install` to install all the required dependencies.
3. **Environment Variables**: Create a `.env` file in the project root directory and add the following environment variables:
   - `BLOB_READ_WRITE_TOKEN`: Your Azure Blob Storage token for read and write operations.
   - `REPLICATE_API_TOKEN`: Your Replicate API token for transcription services.
   - `WORDWARE_API_KEY`: Your Wordware API key for advanced text processing.
   - `LOOPS_API_KEY`: Your Loops API key for audio processing.
   - `NEXT_PUBLIC_POSTHOG_KEY`: Your PostHog API key for analytics.
   - `NEXT_PUBLIC_POSTHOG_HOST`: Your PostHog host URL for analytics.

Example `.env` file content:

```
BLOB_READ_WRITE_TOKEN=your_blob_read_write_token_here
REPLICATE_API_TOKEN=your_replicate_api_token_here
WORDWARE_API_KEY=your_wordware_api_key_here
LOOPS_API_KEY=your_loops_api_key_here
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_api_key_here
NEXT_PUBLIC_POSTHOG_HOST=your_posthog_host_here
```

4. **Start the Application**: Run `npm run dev` to start the application in development mode. The application will be available at `http://localhost:3000`.

**Note:** Ensure you have all the necessary dependencies installed and environment variables set before running the application.

## Contributing to the Project

If you're interested in contributing to the Audioscribe project, please refer to our contributing guidelines. We welcome any contributions that can improve the project's functionality, performance, or user experience.
