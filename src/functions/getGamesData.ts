import pLimit from 'p-limit';
import filterGameTags from './utils/filterGameTags';
import { GameData, SteamGame } from '@/types/TGames';
import SteamSpyDataRes from '@/types/TSteamSpy';
import getTagIds from './utils/getTagIds';

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
                { next: { revalidate: 604800 } }
            ).then((res) => res.json());
        })
    );

    const playedGamesData: SteamSpyDataRes = (
        await Promise.all(playedGamesRequests)
    ).flat();

    const played: GameData[] = playedGamesData.map((game) => {
        const steamData = playedGames.filter((g) => g.appid === game.appid)[0];
        const tagsObj = Object.entries(game.tags).map(([tag, weight]) => ({
            tagid: getTagIds([tag])[0],
            weight: weight,
        }));

        return {
            ...steamData,
            tags: filterGameTags(tagsObj),
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

        const tagsObj = Object.entries(game.tags).map(([tag, weight]) => ({
            tagid: getTagIds([tag])[0],
            weight: weight,
        }));

        return {
            ...steamData,
            tags: filterGameTags(tagsObj),
        };
    });

    return { played, unplayed };
}
