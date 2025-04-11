import pLimit from 'p-limit';
import checkHltbData from './helpers/checkHltbData';
import { SteamGame } from '@/types/SteamGame';

const limit = pLimit(10);

export default async function checkPlaytimes(
    playedGames: SteamGame[],
    recentlyPlayed: Set<string>
) {
    const completedGames: string[] = [];
    const droppedGames: string[] = [];

    const hltbRequests = playedGames.map((game) =>
        limit(async () => {
            const gameName = game.name;
            const playtime = game.playtime;

            const gameIsCompleted = await checkHltbData(gameName, playtime);

            if (gameIsCompleted) {
                completedGames.push(gameName);
            } else if (!recentlyPlayed.has(gameName) && playtime < 600) {
                droppedGames.push(gameName);
            }
        })
    );

    await Promise.all(hltbRequests);

    const result = { completedGames, droppedGames };

    return result;
}
