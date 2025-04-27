import { specificGenres } from '@/arrays/genres';
import { GameWeight } from '@/types/TGames';

export default function getDislikedGenres(gamesWeight: GameWeight[]) {
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

    const dislikedGenres: number[] = [];

    genres.forEach((tag) => {
        const noWeightCount = noWeightTags.filter((dt) => dt === tag).length;
        const withWeightCount = withWeightTags.filter(
            (ct) => ct === tag
        ).length;

        if (noWeightCount >= 3 && noWeightCount > withWeightCount) {
            dislikedGenres.push(tag);
        }
    });

    return dislikedGenres;
}
