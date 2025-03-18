import { HowLongToBeatEntry, HowLongToBeatService } from 'howlongtobeat';
import checkDifferentVersions from './helpers/checkDifferentVersions';
import getTitleDate from './helpers/getTitleDate';

export default async function checkHltbData(
    gameName: string,
    playtime: number
) {
    const hltbService = new HowLongToBeatService();

    const titleHasDate = getTitleDate(gameName); //For remakes, eg: Resident Evil (2005), Resident Evil (2023).

    if (titleHasDate) {
        return await checkDifferentVersions(gameName, playtime, titleHasDate);
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
