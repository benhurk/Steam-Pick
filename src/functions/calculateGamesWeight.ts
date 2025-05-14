import { GameData, GameWeight } from '@/types/TGames';
import {
    calculatePlaytimeScore,
    calculateAchievementsScore,
} from './helpers/calculateScores';

export default function calculateGamesWeight(gamesArray: GameData[]) {
    const gameWeights: GameWeight[] = [];

    gamesArray.forEach((game) => {
        const playtime = game.playtime / 60; //In hours

        const totalAchievementsUnlocked =
            ((game.unlocked_achievements?.length || 0) /
                (game.total_achievements || 0)) *
            100;

        const bestAchievementPercentage = Number(
            game.unlocked_achievements?.sort(
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
            ...game,
            weight: playtimeScore + achievementsScore,
        });
    });

    return gameWeights;
}
