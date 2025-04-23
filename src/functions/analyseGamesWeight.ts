import { TGameWeights } from '@/types/TGameWeights';
import { SteamGame } from '@/types/TSteam';
import {
    calculatePlaytimeScore,
    calculateAchievementsScore,
} from './helpers/calculateScores';

export default function analyseGamesWeight(gamesArray: SteamGame[]) {
    const gameWeights: TGameWeights = [];

    gamesArray.forEach((g) => {
        const playtime = g.playtime / 60; //In hours

        const totalAchievementsUnlocked =
            ((g.unlocked_achievements?.length || 0) /
                (g.total_achievements || 0)) *
            100;

        const bestAchievementPercentage = Number(
            g.unlocked_achievements?.sort(
                (a, b) =>
                    Number(a.player_percent_unlocked) -
                    Number(b.player_percent_unlocked)
            )[0].player_percent_unlocked
        );

        const playtimeScore = calculatePlaytimeScore(playtime);
        const achievementsScore = calculateAchievementsScore(
            totalAchievementsUnlocked,
            bestAchievementPercentage
        );

        gameWeights.push({
            appid: g.appid,
            name: g.name,
            weight: playtimeScore + achievementsScore,
        });
    });

    return gameWeights;
}
