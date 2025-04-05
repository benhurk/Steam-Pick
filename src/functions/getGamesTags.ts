import { SteamGame } from '@/types/gamesData';
import SteamSpyDataRes from '@/types/steamSpyDataRes';
import pLimit from 'p-limit';

const limit = pLimit(2);

export default async function getGamesTags(
    completedGames: Set<Omit<SteamGame, 'playtime'>>,
    droppedGames: Set<Omit<SteamGame, 'playtime'>>
) {
    //Completed games tags
    const completedGamesRequests = [...completedGames].map((game) =>
        limit(async () => {
            const gameData = await fetch(
                `https://steamspy.com/api.php?request=appdetails&appid=${game.appid}`
            )
                .then((res) => res.json())
                .then((data: SteamSpyDataRes) => data);
            return gameData;
        })
    );

    const completedGamesFetch = (
        await Promise.all(completedGamesRequests)
    ).flat();

    const completedGamesTags = completedGamesFetch.map((data) => data.tags);

    //Dropped games tags
    const droppedGamesRequests = [...droppedGames].map((game) =>
        limit(async () => {
            const gameData = await fetch(
                `https://steamspy.com/api.php?request=appdetails&appid=${game.appid}`
            )
                .then((res) => res.json())
                .then((data: SteamSpyDataRes) => data);
            return gameData;
        })
    );

    const droppedGamesFetch = (await Promise.all(droppedGamesRequests)).flat();
    const droppedGamesTags = droppedGamesFetch.map((data) => data.tags);

    return { completedGamesTags, droppedGamesTags };
}
