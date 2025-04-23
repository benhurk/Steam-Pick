import pLimit from 'p-limit';
import filterGameTags from './utils/filterGameTags';
import logGamesData from './utils/logGamesData';
import { SteamGame } from '@/types/TSteam';
import SteamSpyDataRes from '@/types/TSteamSpy';
import { TGameWeights } from '@/types/TGameWeights';

const limit = pLimit(1);

export default async function getGamesData(
    ownedGames: SteamGame[],
    unplayedGames: SteamGame[],
    gameWeights: TGameWeights
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
    const relevantGamesData = ownedGamesData.filter(
        (game) =>
            gameWeights.filter((g) => g.appid === game.appid && g.weight > 0)[0]
    );

    //Dropped
    const irrelevantGamesData = ownedGamesData.filter(
        (game) =>
            gameWeights.filter(
                (g) => g.appid === game.appid && g.weight === 0
            )[0]
    );

    //Unplayed
    const unplayedGamesData = ownedGamesData.filter((game) =>
        unplayedGames
            .map((u) => u.name)
            .some((u) => u === game.name.toLowerCase())
    );

    //Filter to get only the relevant tags ids
    const relevantGamesTags = filterGameTags(relevantGamesData);
    const irrelevantGamesTags = filterGameTags(irrelevantGamesData);

    logGamesData(
        relevantGamesData,
        irrelevantGamesData,
        unplayedGamesData,
        'Rogue-lite'
    );

    return { relevantGamesTags, irrelevantGamesTags, unplayedGamesData };
}
