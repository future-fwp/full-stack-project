// YouTubeVideo.test.tsx
import { render, screen, fireEvent, waitFor} from "@testing-library/react";
import YouTubeVideo from "../components/YouTubeVideo";
import axios from "axios";
import { vi } from "vitest";

import "@testing-library/jest-dom"; 


// Mock axios
vi.mock("axios");

const mockVideos = [
	{
		id: { videoId: "1" },
		snippet: {
			title: "Test Video 1",
			description: "This is a test video",
			thumbnails: {
				medium: {
					url: "https://example.com/thumbnail1.jpg",
				},
			},
			channelTitle: "Test Channel",
		},
		statistics: {
			viewCount: "1000",
		},
	},
	{
		id: { videoId: "2" },
		snippet: {
			title: "Test Video 2",
			description: "This is another test video",
			thumbnails: {
				medium: {
					url: "https://example.com/thumbnail2.jpg",
				},
			},
			channelTitle: "Test Channel 2",
		},
		statistics: {
			viewCount: "2000",
		},
	},
];

const mockComments = [
	{
		id: "1",
		snippet: {
			topLevelComment: {
				snippet: {
					authorDisplayName: "User1",
					authorProfileImageUrl: "https://example.com/user1.jpg",
					textDisplay: "Great video!",
				},
			},
		},
	},
];

const mockRelatedVideos = [
	{
		id: { videoId: "3" },
		snippet: {
			title: "Related Video 1",
			description: "This is a related video",
			thumbnails: {
				medium: {
					url: "https://example.com/thumbnail3.jpg",
				},
			},
			channelTitle: "Related Channel",
		},
		statistics: {
			viewCount: "3000",
		},
	},
];

describe("YouTubeVideo", () => {
	beforeEach(() => {
		// Mock axios responses
		(axios.get as jest.Mock).mockImplementation((url) => {
			if (url.includes("/search")) {
				return Promise.resolve({ data: { items: mockVideos } });
			}
			if (url.includes("/videos")) {
				return Promise.resolve({ data: { items: mockVideos } });
			}
			if (url.includes("/commentThreads")) {
				return Promise.resolve({ data: { items: mockComments } });
			}
			return Promise.reject(new Error("Unknown API call"));
		});
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("renders the component without crashing", () => {
		render(<YouTubeVideo />);
		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("fetches and displays videos", async () => {
		render(<YouTubeVideo />);

		// Wait for videos to be fetched and displayed
		await waitFor(() => expect(screen.getByText("Test Video 1")).toBeInTheDocument());
		expect(screen.getByText("Test Video 2")).toBeInTheDocument();
	});

	it("displays an error message if fetching videos fails", async () => {
		(axios.get as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch videos"));
		render(<YouTubeVideo />);

		await waitFor(() =>
			expect(screen.getByText("Failed to fetch videos. Please try again later.")).toBeInTheDocument()
		);
	});

	it("selects a video and displays its details", async () => {
		render(<YouTubeVideo />);

		// Wait for videos to be fetched and displayed
		await waitFor(() => expect(screen.getByText("Test Video 1")).toBeInTheDocument());

		// Click on the first video
		fireEvent.click(screen.getByText("Test Video 1"));

		// Wait for the selected video details to be displayed
		await waitFor(() => expect(screen.getByText("This is a test video")).toBeInTheDocument());
	});

	it("fetches and displays comments for the selected video", async () => {
		render(<YouTubeVideo />);

		// Wait for videos to be fetched and displayed
		await waitFor(() => expect(screen.getByText("Test Video 1")).toBeInTheDocument());

		// Click on the first video
		fireEvent.click(screen.getByText("Test Video 1"));

		// Wait for comments to be fetched and displayed
		await waitFor(() => expect(screen.getByText("Great video!")).toBeInTheDocument());
	});

	it("fetches and displays related videos for the selected video", async () => {
		render(<YouTubeVideo />);

		// Wait for videos to be fetched and displayed
		await waitFor(() => expect(screen.getByText("Test Video 1")).toBeInTheDocument());

		// Click on the first video
		fireEvent.click(screen.getByText("Test Video 1"));

		// Wait for related videos to be fetched and displayed
		await waitFor(() => expect(screen.getByText("Related Video 1")).toBeInTheDocument());
	});
});
