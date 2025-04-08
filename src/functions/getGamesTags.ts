import { SteamGame } from '@/types/gamesData';
import SteamSpyDataRes from '@/types/steamSpyDataRes';
import pLimit from 'p-limit';
import logGamesData from './utils/logGamesData';
import filterGameTags from './helpers/filterGameTags';

const limit = pLimit(2);

export default async function getGamesTags(
    completedGames: Set<Omit<SteamGame, 'playtime'>>,
    droppedGames: Set<Omit<SteamGame, 'playtime'>>
) {
    //Completed games tags
    const completedGamesRequests = [...completedGames].map((game) =>
        limit(async () => {
            const gameData = await fetch(
                `https://steamspy.com/api.php?request=appdetails&appid=${game.appid}`,
                { next: { revalidate: 86400 } }
            )
                .then((res) => res.json())
                .then((data: SteamSpyDataRes) => data);
            return gameData;
        })
    );

    const completedGamesFetch = (
        await Promise.all(completedGamesRequests)
    ).flat();

    const completedGamesTags = filterGameTags(completedGamesFetch);

    //Dropped games tags
    const droppedGamesRequests = [...droppedGames].map((game) =>
        limit(async () => {
            const gameData = await fetch(
                `https://steamspy.com/api.php?request=appdetails&appid=${game.appid}`,
                { next: { revalidate: 86400 } }
            )
                .then((res) => res.json())
                .then((data: SteamSpyDataRes) => data);
            return gameData;
        })
    );

    const droppedGamesFetch = (await Promise.all(droppedGamesRequests)).flat();

    const droppedGamesTags = filterGameTags(droppedGamesFetch);

    logGamesData(completedGamesFetch, droppedGamesFetch);
    return { completedGamesTags, droppedGamesTags };
}
