# React Firebase Chat App

**[Click Here to See Live](https://chat-react-firebase-6de84.web.app/)**

Simple chat application - built with React and Firebase. Users can sign in with Google authentication and send messages in a chat room.

## Features

- Google authentication: Users can sign in with their Google accounts.
- Real-time messaging: Messages are instantly synchronized across all users in the chat room.

## Technologies Used

- React: Frontend framework for building user interfaces.
- Firebase: Backend-as-a-Service platform for real-time database and authentication.
- Tailwind CSS: Utility-first CSS framework for styling the user interface.

## Setup Instructions

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/elen-oz/chat_react-firebase.git
   ```
2. Navigate to the project directory:
   ```bash
   cd chat_react-firebase
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up Firebase:

   a) Create a new project on the Firebase Console.
   b) Copy the Firebase configuration object.
   c) Replace the Firebase configuration object in src/firebaseConfig.js with _your own_ configuration.
   d) Start the development server:

   ```bash
   npm run dev
   ```

Open your browser and visit http://localhost:5173/ to view the application.
