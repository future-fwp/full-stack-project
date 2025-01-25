// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	test: {
		environment: "jsdom", // Use jsdom for browser-like testing
		globals: true, // Enable global variables like `describe`, `it`, and `expect`
		setupFiles: "./vitest.setup.ts", // Optional: Add setup file
	},
});
