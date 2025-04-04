import pLimit from 'p-limit';
import checkHltbData from './checkHltbData';
import { SteamGame } from '@/types/gamesData';

const limit = pLimit(10);

export default async function filterGames(
    playedGames: SteamGame[],
    recentlyPlayed: Set<string>
) {
    const completedGames = new Set<Omit<SteamGame, 'playtime'>>();
    const droppedGames = new Set<Omit<SteamGame, 'playtime'>>();

    const hltbRequests = playedGames.map((game) =>
        limit(async () => {
            const gameName = game.name;
            const playtime = game.playtime;

            const gameIsCompleted = await checkHltbData(gameName, playtime);

            if (gameIsCompleted) {
                completedGames.add({
                    appid: game.appid,
                    name: gameName,
                });
            } else if (!recentlyPlayed.has(gameName) && playtime < 600) {
                droppedGames.add({
                    appid: game.appid,
                    name: gameName,
                });
            }
        })
    );

    await Promise.all(hltbRequests);

    return { completedGames, droppedGames };
}
