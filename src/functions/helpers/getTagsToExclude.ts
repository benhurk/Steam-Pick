import gameTags from '@/consts/gameTags';
import { GameWeight } from '@/types/TGames';
import { TPreferences } from '@/types/TPreferences';

export default function getTagsToExclude(
    gamesWeight: GameWeight[],
    preferences: TPreferences
) {
    const allTags = gamesWeight.map((g) => g.tags).flat();
    const genres = allTags.filter((tag) =>
        gameTags.specificGenres.some((genre) => genre.tagid === tag)
    );

    const noWeightTags = gamesWeight
        .filter((g) => g.weight === 0)
        .map((g) => g.tags)
        .flat();

    const withWeightTags = gamesWeight
        .filter((g) => g.weight > 0)
        .map((g) => g.tags)
        .flat();

    const toExclude: number[] = [...preferences.exclude];

    genres.forEach((tag) => {
        const noWeightCount = noWeightTags.filter((dt) => dt === tag).length;
        const withWeightCount = withWeightTags.filter(
            (ct) => ct === tag
        ).length;

        if (noWeightCount >= 3 && noWeightCount > withWeightCount) {
            if (!toExclude.includes(tag)) toExclude.push(tag);
        }
    });

    return toExclude;
}
