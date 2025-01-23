# YouTube Clone

A modern YouTube clone built with React, TypeScript, and Tailwind CSS. This application provides a seamless video browsing experience with features similar to YouTube.

## Features

- 🎥 Video Categories
  - Home: Popular videos
  - Explore: Trending content
  - Movies: Latest movie trailers
  - Gaming: Gaming content
  - News: Latest news videos
  - Sports: Sports highlights
  - Learning: Educational content

- 💫 Modern UI Features
  - Responsive design
  - Collapsible sidebar navigation
  - Video grid layout
  - Video player with comments
  - Related videos sidebar
  - View count formatting
  - Smooth animations with Framer Motion

## Tech Stack

- ⚛️ React 18
- 🔷 TypeScript
- 🎨 Tailwind CSS
- 🚀 Vite
- 🎭 Framer Motion
- 🔄 React Router DOM
- 📡 Axios
- 🎬 YouTube Data API v3

## Getting Started

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory and add your YouTube API key:
```env
VITE_YOUTUBE_API_KEY=your_youtube_api_key
```

4. Start the development server
```bash
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── Sidebar.tsx        # Navigation sidebar
│   ├── YouTubeVideo.tsx   # Main video component
│   └── VideoCard.tsx      # Video preview card
├── pages/
│   └── Home.tsx           # Main page layout
├── lib/
│   └── types.ts           # TypeScript interfaces
└── App.tsx                # Root component
```

## Features in Detail

### Video Categories
- Each category fetches relevant content using the YouTube Data API
- Custom search queries for different content types
- View counts and video statistics

### UI Components
- Responsive sidebar with animated transitions
- Video grid with thumbnail previews
- Full video player with related videos
- Comment section for each video

### Navigation
- Client-side routing with React Router
- Persistent layout between route changes
- Smooth transitions between pages

## Contributing

Feel free to submit issues and enhancement requests!
