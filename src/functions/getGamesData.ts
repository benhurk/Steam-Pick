import pLimit from 'p-limit';
import filterGameTags from './utils/filterGameTags';
import logGamesData from './utils/logGamesData';
import { SteamGame } from '@/types/TSteam';
import SteamSpyDataRes from '@/types/TSteamSpy';

const limit = pLimit(1);

export default async function getGamesData(
    ownedGames: SteamGame[],
    completedGames: Set<string>,
    droppedGames: Set<string>,
    unplayedGames: SteamGame[]
) {
    const requests = ownedGames.map((game) =>
        limit(async () => {
            return await fetch(
                `https://steamspy.com/api.php?request=appdetails&appid=${game.appid}`,
                { next: { revalidate: 86400 } }
            ).then((res) => res.json());
        })
    );

    const ownedGamesData: SteamSpyDataRes = (
        await Promise.all(requests)
    ).flat();

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

    logGamesData(completedGamesData, droppedGamesData, unplayedGamesData);

    return { completedGamesTags, droppedGamesTags, unplayedGamesData };
}
