import SteamSpyDataRes from '@/types/SteamSpyDataRes';
import getMatchingTags from './helpers/getMatchingTags';
import recommendConditions from './utils/recommendConditions';

export default function getRecomendations(
    favoriteGenres: [string, number][],
    favoriteGameplay: [string, number][],
    favoriteThemes: [string, number][],
    favoriteMoods: [string, number][],
    dislikedGenres: string[],
    unplayedGamesData: SteamSpyDataRes,
    unexploredGenres: string[]
) {
    //Already owned recommendation
    const unplayedOwnedMap = new Map<string, number>();

    unplayedGamesData.forEach((game) => {
        const gameTags = Object.keys(game.tags);

        const {
            matchingGenres,
            matchingGameplay,
            matchingThemes,
            matchingMoods,
        } = getMatchingTags(
            gameTags,
            favoriteGenres,
            favoriteGameplay,
            favoriteThemes,
            favoriteMoods
        );

        const hasDislikedGenre =
            gameTags.filter((tag) =>
                dislikedGenres.some((genre) => genre === tag)
            ).length > 0;

        const nonGenreMatchingTags =
            matchingGameplay + matchingThemes + matchingMoods;

        const matchingTags = matchingGenres.count + nonGenreMatchingTags;

        if (
            recommendConditions(
                matchingGenres.count,
                matchingGameplay,
                nonGenreMatchingTags,
                hasDislikedGenre,
                matchingGenres.tags
            )
        ) {
            unplayedOwnedMap.set(game.name, matchingTags);
        }
    });

    const unplayedOwnedRecommendation = [...unplayedOwnedMap.entries()].sort(
        (a, b) => b[1] - a[1]
    );

    console.log(
        'Already owned game recommendation:',
        unplayedOwnedRecommendation
    );

    //Unexplored genre recommendation
    const unexploredOwnedMap = new Map<string, number>();

    unplayedGamesData.forEach((game) => {
        const gameTags = Object.keys(game.tags);

        const matchingUnexploredGenres = gameTags.filter((tag) =>
            unexploredGenres.some((genre) => genre === tag)
        ).length;

        const {
            matchingGenres,
            matchingGameplay,
            matchingThemes,
            matchingMoods,
        } = getMatchingTags(
            gameTags,
            favoriteGenres,
            favoriteGameplay,
            favoriteThemes,
            favoriteMoods
        );

        const hasDislikedGenre =
            gameTags.filter((tag) =>
                dislikedGenres.some((genre) => genre === tag)
            ).length > 0;

        const nonGenreMatchingTags =
            matchingGameplay + matchingThemes + matchingMoods;

        const matchingTags = matchingUnexploredGenres + nonGenreMatchingTags;

        if (
            matchingUnexploredGenres > 0 &&
            matchingGenres.count === 0 &&
            matchingGameplay > 1 &&
            nonGenreMatchingTags > 2 &&
            !hasDislikedGenre
        ) {
            unexploredOwnedMap.set(game.name, matchingTags);
        }
    });

    const unexploredOwnedRecommendation = [
        ...unexploredOwnedMap.entries(),
    ].sort((a, b) => b[1] - a[1]);

    console.log(
        'Unexplored genre, already owned game recommendation:',
        unexploredOwnedRecommendation
    );

    return { unplayedOwnedRecommendation };
}
