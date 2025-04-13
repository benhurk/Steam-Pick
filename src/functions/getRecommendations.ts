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
    const unplayedOwned: {
        name: string;
        id: number;
        matchingTags: number;
    }[] = [];

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
            unplayedOwned.push({
                name: game.name,
                id: game.appid,
                matchingTags,
            });
        }
    });

    const unplayedOwnedRecommendations = unplayedOwned.sort(
        (a, b) => b.matchingTags - a.matchingTags
    );

    console.log(
        'Already owned game recommendation:',
        unplayedOwnedRecommendations
    );

    //Unexplored genre recommendation
    const unexploredOwned: {
        name: string;
        id: number;
        matchingTags: number;
    }[] = [];

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
            unexploredOwned.push({
                name: game.name,
                id: game.appid,
                matchingTags,
            });
        }
    });

    const unexploredOwnedRecommendations = unexploredOwned.sort(
        (a, b) => b.matchingTags - a.matchingTags
    );

    console.log(
        'Unexplored genre, already owned game recommendation:',
        unexploredOwnedRecommendations
    );

    return { unplayedOwnedRecommendations, unexploredOwnedRecommendations };
}
