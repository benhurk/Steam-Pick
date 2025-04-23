export default function isRecentlyPlayed(rtime_last_played: number) {
    // Current time in seconds (Unix timestamp)
    const currentTime = Math.floor(Date.now() / 1000);

    // 2 weeks in seconds (14 days × 24 hours × 60 minutes × 60 seconds)
    const twoWeeksInSeconds = 14 * 24 * 60 * 60;

    // Calculate the time difference
    const timeDifference = currentTime - rtime_last_played;

    // Check if the difference is within 2 weeks
    return timeDifference <= twoWeeksInSeconds;
}
