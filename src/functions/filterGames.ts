import pLimit from 'p-limit';
import checkHltbData from './checkHltbData';

const limit = pLimit(10);

export default async function filterGames(
    playedGames: { name: string; playtime: number }[],
    recentlyPlayed: Set<string>
) {
    const completedGames: Set<string> = new Set();
    const droppedGames: Set<string> = new Set();

    const hltbRequests = playedGames.map((game) =>
        limit(async () => {
            const gameName = game.name;
            const playtime = game.playtime;

            const gameIsCompleted = await checkHltbData(gameName, playtime);

            if (gameIsCompleted) {
                completedGames.add(gameName);
            } else if (!recentlyPlayed.has(gameName) && playtime < 600) {
                droppedGames.add(gameName);
            }
        })
    );

    await Promise.all(hltbRequests);

    return { completedGames, droppedGames };
}
