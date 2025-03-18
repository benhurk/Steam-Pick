import { DataResponse, KeywordsResponse } from '@/types/IgdbDataRes';
import getIgdbToken from './helpers/getIgdbToken';
import chunckArray from './utils/chunckArray';

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

    const data = await fetch('https://api.igdb.com/v4/games/', {
        method: 'POST',
        headers: headers,
        body: `fields genres, keywords, themes; where name = ("${[
            ...completedGames,
        ].join('", "')}"); limit 500;`,
    })
        .then((res) => res.json())
        .then((data: DataResponse) => data);

    const keywordsIds = chunckArray(
        data
            .map((d) => d.keywords)
            .filter((kw) => kw != undefined)
            .flat(),
        500
    );
    const themesIds = data.map((d) => d.themes).flat();
    const genresIds = data.map((d) => d.genres).flat();

    //igdb keywords
    const keywords = await fetch('https://api.igdb.com/v4/keywords', {
        method: 'POST',
        headers: headers,
        body: `fields name; where id = (${[
            ...keywordsIds,
        ].join()}); limit 500;`,
    })
        .then((res) => res.json())
        .then((data: KeywordsResponse) => {
            console.log(data);
            return new Set(data.map((kw) => kw.name));
        });

    //igdb themes
    const themes = await fetch('https://api.igdb.com/v4/themes', {
        method: 'POST',
        headers: headers,
        body: `fields name; where id = (${themesIds});`,
    })
        .then((res) => res.json())
        .then(
            (data: KeywordsResponse) => new Set(data.map((theme) => theme.name))
        );

    //igdb genres
    const genres = await fetch('https://api.igdb.com/v4/genres', {
        method: 'POST',
        headers: headers,
        body: `fields name; where id = (${genresIds});`,
    })
        .then((res) => res.json())
        .then(
            (data: KeywordsResponse) => new Set(data.map((genre) => genre.name))
        );

    return { genres, keywords, themes };
}
