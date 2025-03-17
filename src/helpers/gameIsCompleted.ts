import { HowLongToBeatEntry, HowLongToBeatService } from 'howlongtobeat';
import checkDifferentVersions from './checkDifferentVersions';

export default async function gameIsCompleted(
    gameName: string,
    playtime: number,
    releaseDate?: string
) {
    const hltbService = new HowLongToBeatService();

    if (releaseDate) {
        return await checkDifferentVersions(gameName, playtime, releaseDate);
    }

    const data: HowLongToBeatEntry = await hltbService
        .search(gameName)
        .then((res) => res[0]);

    if (!data) return false;

    const errorMargin = data.gameplayMain * 0.2;
    const minPlaytime = data.gameplayMain - errorMargin;

    if (playtime < minPlaytime * 60) return false;
    else return true;
}
