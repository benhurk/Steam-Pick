import { DataResponse } from '@/types/IgdbDataRes';
import getIgdbToken from './helpers/getIgdbToken';
import getNamesFromIds from './utils/getNamesFromIds';
import { mainGenres, mainKeywords, mainThemes } from '@/arrays/igdbTags';
import { SteamGame } from '@/types/gamesData';
import pLimit from 'p-limit';

const limit = pLimit(1);

export default async function getIgdbData(
    completedGames: Set<Omit<SteamGame, 'playtime'>>,
    droppedGames: Set<Omit<SteamGame, 'playtime'>>
) {
    const IGDB_TOKEN = await getIgdbToken();

    const headers = {
        'Client-ID': process.env.IGDB_ID!,
        Authorization: `Bearer ${IGDB_TOKEN}`,
        'Content-Type': 'application/json',
    };

    //Completed games data
    const completedGamesRequests = [...completedGames].map((game) =>
        limit(async () => {
            const gameData = await fetch('https://api.igdb.com/v4/games/', {
                method: 'POST',
                headers: headers,
                body: `fields name, genres, keywords, themes;
                        where external_games.external_game_source = 1 & 
                        external_games.uid = "${game.appid}";`,
            })
                .then((res) => res.json())
                .then((data: DataResponse) => data);
            return gameData;
        })
    );

    const completedGamesFetch = (
        await Promise.all(completedGamesRequests)
    ).flat();

    const completedGamesData = {
        keywordsIds: completedGamesFetch.map((d) => d.keywords || []).flat(),
        themesIds: completedGamesFetch.map((d) => d.themes || []).flat(),
        genresIds: completedGamesFetch.map((d) => d.genres || []).flat(),
    };

    //Dropped games data
    const droppedGamesRequests = [...droppedGames].map((game) =>
        limit(async () => {
            const gameData = await fetch('https://api.igdb.com/v4/games/', {
                method: 'POST',
                headers: headers,
                body: `fields name, genres, keywords, themes; 
                        where external_games.external_game_source = 1 & 
                        external_games.uid = "${game.appid}" &;`,
            })
                .then((res) => res.json())
                .then((data: DataResponse) => data);

            return gameData;
        })
    );

    const droppedGamesFetch = (await Promise.all(droppedGamesRequests)).flat();

    const droppedGamesData = {
        keywordsIds: droppedGamesFetch.map((d) => d.keywords || []).flat(),
        themesIds: droppedGamesFetch.map((d) => d.themes || []).flat(),
        genresIds: droppedGamesFetch.map((d) => d.genres || []).flat(),
    };

    //Log
    const log = completedGamesFetch.map((game) => {
        return {
            name: game.name,
            genres: getNamesFromIds(game.genres, mainGenres),
            themes: getNamesFromIds(game.themes, mainThemes),
            keywords: getNamesFromIds(game.keywords, mainKeywords),
        };
    });

    console.log(log);

    return { completedGamesData, droppedGamesData };
}
