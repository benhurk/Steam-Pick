import { DataResponse, KeywordsResponse } from '@/types/IgdbDataRes';
import getIgdbToken from './getIgdbToken';

export default async function getIgdbData() {
    const IGDB_TOKEN = await getIgdbToken();

    const headers = {
        'Client-ID': process.env.IGDB_ID!,
        Authorization: `Bearer ${IGDB_TOKEN}`,
        'Content-Type': 'application/json',
    };

    const dataRes = await fetch('https://api.igdb.com/v4/games/', {
        method: 'POST',
        headers: headers,
        body: `fields genres, keywords, themes; where name = "Hollow Knight";`,
    });

    const data: DataResponse = await dataRes.json();

    //igdb keywords
    const keywordsRes = await fetch('https://api.igdb.com/v4/keywords', {
        method: 'POST',
        headers: headers,
        body: `fields name; where id = (${data[0].keywords}); limit 50;`,
    });

    const keywordsData: KeywordsResponse = await keywordsRes.json();
    const keywords = keywordsData.map((kw) => kw.name);

    //igdb themes
    const themesRes = await fetch('https://api.igdb.com/v4/themes', {
        method: 'POST',
        headers: headers,
        body: `fields name; where id = (${data[0].themes});`,
    });

    const themesData: KeywordsResponse = await themesRes.json();
    const themes = themesData.map((theme) => theme.name);

    //igdb genres
    const genresRes = await fetch('https://api.igdb.com/v4/genres', {
        method: 'POST',
        headers: headers,
        body: `fields name; where id = (${data[0].genres});`,
    });

    const genresData: KeywordsResponse = await genresRes.json();
    const genres = genresData.map((genre) => genre.name);
}
