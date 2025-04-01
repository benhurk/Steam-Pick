import { DataResponse } from '@/types/IgdbDataRes';
import getIgdbToken from './helpers/getIgdbToken';

export default async function getIgdbData(
    completedGames: Set<string>,
    droppedGames: Set<string>
) {
    const IGDB_TOKEN = await getIgdbToken();

    const headers = {
        'Client-ID': process.env.IGDB_ID!,
        Authorization: `Bearer ${IGDB_TOKEN}`,
        'Content-Type': 'application/json',
    };

    //Completed games data
    const completedGamesFetch = await fetch('https://api.igdb.com/v4/games/', {
        method: 'POST',
        headers: headers,
        body: `fields genres, keywords, themes; where name = ("${[
            ...completedGames,
        ].join('", "')}"); limit 500;`,
    })
        .then((res) => res.json())
        .then((data: DataResponse) => data);

    const completedGamesData = {
        keywordsIds: completedGamesFetch.map((d) => d.keywords || []).flat(),
        themesIds: completedGamesFetch.map((d) => d.themes || []).flat(),
        genresIds: completedGamesFetch.map((d) => d.genres || []).flat(),
    };

    //Dropped games data
    const droppedGamesFetch = await fetch('https://api.igdb.com/v4/games/', {
        method: 'POST',
        headers: headers,
        body: `fields genres, keywords, themes; where name = ("${[
            ...droppedGames,
        ].join('", "')}"); limit 500;`,
    })
        .then((res) => res.json())
        .then((data: DataResponse) => data);

    const droppedGamesData = {
        keywordsIds: droppedGamesFetch.map((d) => d.keywords || []).flat(),
        themesIds: droppedGamesFetch.map((d) => d.themes || []).flat(),
        genresIds: droppedGamesFetch.map((d) => d.genres || []).flat(),
    };

    return { completedGamesData, droppedGamesData };
}
