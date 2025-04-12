import { specificGenres } from '@/arrays/genres';

export default function recommendConditions(
    matchingGenres: number,
    matchingGameplay: number,
    nonGenreMatchingTags: number,
    hasDislikedGenre: boolean,
    matchingGenreTags: string[]
) {
    const noSpecificGenresMatching =
        matchingGenreTags.filter((gt) =>
            specificGenres.some((genre) => genre === gt)
        ).length === 0;

    //For games with only broad genres matching
    if (noSpecificGenresMatching) {
        if (
            matchingGenres > 0 &&
            matchingGameplay > 1 &&
            nonGenreMatchingTags > 2 &&
            !hasDislikedGenre
        ) {
            return true;
        } else return false;
    }
    //For regular recommendations
    if (
        matchingGenres > 0 &&
        matchingGameplay > 0 &&
        nonGenreMatchingTags > 2 &&
        !hasDislikedGenre
    ) {
        return true;
    } else return false;
}
