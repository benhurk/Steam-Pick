import { SteamGame } from '@/types/SteamGame';
import SteamSpyDataRes from '@/types/steamSpyDataRes';
import pLimit from 'p-limit';
import filterGameTags from './helpers/filterGameTags';
import logGamesData from './utils/logGamesData';

const limit = pLimit(2);

export default async function getGamesData(
    ownedGames: SteamGame[],
    completedGames: Set<string>,
    droppedGames: Set<string>,
    unplayedGames: Set<string>
) {
    //Completed games tags
    const steamSpyRequests = ownedGames.map((game) =>
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

    const ownedGamesData = (await Promise.all(steamSpyRequests)).flat();

    const completedGamesData = ownedGamesData.filter((game) =>
        completedGames.has(game.name)
    );

    const droppedGamesData = ownedGamesData.filter((game) =>
        droppedGames.has(game.name)
    );

    const unplayedGamesData = ownedGamesData.filter((game) =>
        unplayedGames.has(game.name)
    );

    const completedGamesTags = filterGameTags(completedGamesData);
    const droppedGamesTags = filterGameTags(droppedGamesData);

    logGamesData(completedGamesData, droppedGamesData, unplayedGamesData);
    return { completedGamesTags, droppedGamesTags, unplayedGamesData };
}
