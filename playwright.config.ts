import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "./tests",
    timeout: 60_000,
    fullyParallel: true,
    reporter: "html",
    use: {
        baseURL: "http://localhost:8080",
        trace: "on-first-retry",
    },
    webServer: {
        command: "npm run dev",
        url: "http://localhost:8080",
        reuseExistingServer: !process.env.CI,
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],
});
