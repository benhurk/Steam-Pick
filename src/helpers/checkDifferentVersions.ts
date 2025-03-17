import { HowLongToBeatEntry, HowLongToBeatService } from 'howlongtobeat';

export default async function checkDifferentVersions(
    gameName: string,
    playtime: number,
    releaseDate: string
) {
    const hltbService = new HowLongToBeatService();
    gameName = gameName.split(releaseDate)[0];

    const data: HowLongToBeatEntry[] = await hltbService
        .search(gameName)
        .then((res) => [res[0], res[1]]);

    if (!data) return false;

    const results: boolean[] = [];

    data.forEach((entry) => {
        const errorMargin = entry.gameplayMain * 0.2;
        const minPlaytime = entry.gameplayMain - errorMargin;

        if (playtime < minPlaytime * 60) results.push(false);
        else results.push(true);
    });

    if (results.some((result) => result === true)) return true;
    else return false;
}
