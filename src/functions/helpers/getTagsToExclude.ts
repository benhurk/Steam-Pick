import gameTags from '@/consts/gameTags';
import { excludeByDefault } from '@/consts/preferencesInitialState';
import { GameWeight } from '@/types/TGames';

export default function getTagsToExclude(gamesWeight: GameWeight[]) {
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

    const toExclude: number[] = [...excludeByDefault];

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
