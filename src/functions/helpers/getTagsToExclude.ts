import { specificGenres } from '@/arrays/genres';
import { GameWeight } from '@/types/TGames';
import { TPreferences } from '@/types/TPreferences';

export default function getTagsToExclude(
    gamesWeight: GameWeight[],
    preferences: TPreferences | undefined
) {
    const allTags = gamesWeight.map((g) => g.tags).flat();
    const genres = allTags.filter((tag) =>
        specificGenres.some((genre) => genre.tagid === tag)
    );

    const noWeightTags = gamesWeight
        .filter((g) => g.weight === 0)
        .map((g) => g.tags)
        .flat();

    const withWeightTags = gamesWeight
        .filter((g) => g.weight > 0)
        .map((g) => g.tags)
        .flat();

    const toExclude: number[] = [];

    if (!preferences?.earlyAccess) toExclude.push(493);
    if (!preferences?.vr) toExclude.push(21978);

    genres.forEach((tag) => {
        const noWeightCount = noWeightTags.filter((dt) => dt === tag).length;
        const withWeightCount = withWeightTags.filter(
            (ct) => ct === tag
        ).length;

        if (noWeightCount >= 3 && noWeightCount > withWeightCount) {
            toExclude.push(tag);
        }
    });

    return toExclude;
}
