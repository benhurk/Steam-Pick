import pLimit from 'p-limit';
import filterGameTags from './utils/filterGameTags';
// import logGamesData from './utils/logGamesData';
import { GameData, SteamGame } from '@/types/TGames';
import SteamSpyDataRes from '@/types/TSteamSpy';

const limit = pLimit(1);

export default async function getGamesData(
    playedGames: SteamGame[],
    unplayedGames: SteamGame[]
) {
    //Played games data
    const playedGamesRequests = playedGames.map((game) =>
        limit(async () => {
            return await fetch(
                `https://steamspy.com/api.php?request=appdetails&appid=${game.appid}`,
                { next: { revalidate: 86400 } }
            ).then((res) => res.json());
        })
    );

    const playedGamesData: SteamSpyDataRes = (
        await Promise.all(playedGamesRequests)
    ).flat();

    const played: GameData[] = playedGamesData.map((game) => {
        const steamData = playedGames.filter((g) => g.appid === game.appid)[0];

        return {
            ...steamData,
            tags: filterGameTags(game.tags),
        };
    });

    //Unplayed games data
    const unplayedGamesRequests = unplayedGames.map((game) =>
        limit(async () => {
            return await fetch(
                `https://steamspy.com/api.php?request=appdetails&appid=${game.appid}`,
                { next: { revalidate: 86400 } }
            ).then((res) => res.json());
        })
    );

    const unplayedGamesData: SteamSpyDataRes = (
        await Promise.all(unplayedGamesRequests)
    ).flat();

    const unplayed: GameData[] = unplayedGamesData.map((game) => {
        const steamData = unplayedGames.filter(
            (g) => g.appid === game.appid
        )[0];

        return {
            ...steamData,
            tags: filterGameTags(game.tags),
        };
    });

    return { played, unplayed };
}
