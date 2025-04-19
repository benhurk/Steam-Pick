import filterGameTags from './utils/filterGameTags';
import logGamesData from './utils/logGamesData';

import { SteamGame } from '@/types/SteamGame';
import getSteamSpyAppDetails from './helpers/getSteamSpyAppDetails';

export default async function getGamesData(
    ownedGames: SteamGame[],
    completedGames: Set<string>,
    droppedGames: Set<string>,
    unplayedGames: SteamGame[]
) {
    const ownedGamesData = await getSteamSpyAppDetails(
        ownedGames.map((games) => games.appid)
    );

    //Completed
    const completedGamesData = ownedGamesData.filter((game) =>
        completedGames.has(game.name.toLowerCase())
    );

    //Dropped
    const droppedGamesData = ownedGamesData.filter((game) =>
        droppedGames.has(game.name.toLowerCase())
    );

    //Unplayed
    const unplayedGamesNames = new Set(
        unplayedGames.map((g) => g.name.toLowerCase())
    );

    const unplayedGamesData = ownedGamesData.filter((game) =>
        unplayedGamesNames.has(game.name.toLowerCase())
    );

    //Get tags
    const completedGamesTags = filterGameTags(completedGamesData);
    const droppedGamesTags = filterGameTags(droppedGamesData);

    console.log(completedGamesTags);

    logGamesData(completedGamesData, droppedGamesData, unplayedGamesData);

    return { completedGamesTags, droppedGamesTags, unplayedGamesData };
}
