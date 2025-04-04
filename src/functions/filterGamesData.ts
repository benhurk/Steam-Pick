import { mainGenres, mainKeywords, mainThemes } from '@/arrays/igdbTags';
import { GamesTags } from '@/types/gamesData';

export default function filterGamesData(
    completedGamesData: GamesTags,
    droppedGamesData: GamesTags
) {
    const igdbMainGenresIds = mainGenres.map((genre) => genre.id);
    const igdbMainThemesIds = mainThemes.map((theme) => theme.id);
    const igdbMainKeywordsIds = mainKeywords.map((kw) => kw.id);

    //Filter completed games data
    const likedGenresCount = new Map();
    const likedThemesCount = new Map();
    const likedKeywordsCount = new Map();

    igdbMainGenresIds.forEach((id) => {
        const count = completedGamesData.genresIds.filter(
            (gid) => gid === id
        ).length;

        const genreName = mainGenres.find((genre) => genre.id === id)!.name;
        likedGenresCount.set(genreName, count);
    });

    igdbMainThemesIds.forEach((id) => {
        const count = completedGamesData.themesIds.filter(
            (tid) => tid === id
        ).length;

        const themeName = mainThemes.find((theme) => theme.id === id)!.name;
        likedThemesCount.set(themeName, count);
    });

    igdbMainKeywordsIds.forEach((id) => {
        const count = completedGamesData.keywordsIds.filter(
            (kwid) => kwid === id
        ).length;

        const keywordName = mainKeywords.find((kw) => kw.id === id)!.name;
        likedKeywordsCount.set(keywordName, count);
    });

    const topGenres = [...likedGenresCount.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([genre]) => genre);

    const topThemes = [...likedThemesCount.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([theme]) => theme);

    const topKeywords = [...likedKeywordsCount.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([kw]) => kw);

    console.log(likedGenresCount);
    console.log(likedThemesCount);
    console.log(likedKeywordsCount);

    console.log(topGenres);
    console.log(topThemes);
    console.log(topKeywords);
}
