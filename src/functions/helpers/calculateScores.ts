export function calculatePlaytimeScore(playtime: number) {
    // if (playtime >= 100) return 4;
    if (playtime >= 50) return 3;
    if (playtime >= 20) return 2;
    if (playtime > 10) return 1;
    return 0;
}

export function calculateAchievementsScore(
    totalAchievementsPercentage: number,
    bestAchievementPercentage: number
) {
    if (totalAchievementsPercentage < 50) {
        if (bestAchievementPercentage >= 25) return 0;
        if (bestAchievementPercentage < 25) return 1;
    }

    if (totalAchievementsPercentage >= 50) {
        if (bestAchievementPercentage >= 25) return 1;

        if (bestAchievementPercentage < 25) {
            if (totalAchievementsPercentage < 100) return 2;
            else return 3;
        }
    }

    return 0;
}
