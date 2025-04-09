import SteamSpyDataRes from '@/types/steamSpyDataRes';

export default async function getRecomendations(
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

        const matchingGenres = gameTags.filter((tag) =>
            favoriteGenres.some(([genre]) => genre === tag)
        ).length;

        const matchingGameplay = gameTags.filter((tag) =>
            favoriteGameplay.some(([gp]) => gp === tag)
        ).length;

        const matchingThemes = gameTags.filter((tag) =>
            favoriteThemes.some(([theme]) => theme === tag)
        ).length;

        const matchingMoods = gameTags.filter((tag) =>
            favoriteMoods.some(([mood]) => mood === tag)
        ).length;

        const hasDislikedGenre =
            gameTags.filter((tag) =>
                dislikedGenres.some((genre) => genre === tag)
            ).length > 0;

        const nonGenreMatchingTags =
            matchingGameplay + matchingThemes + matchingMoods;

        const matchingTags = matchingGenres + nonGenreMatchingTags;

        if (
            matchingGenres > 0 &&
            matchingGameplay > 0 &&
            nonGenreMatchingTags > 2 &&
            !hasDislikedGenre
        ) {
            unplayedOwnedMap.set(game.name, matchingTags);
        }
    });

    const unplayedOwnedRecommendation = [...unplayedOwnedMap.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([game]) => game);

    console.log(
        'Already owned game recommendation:',
        unplayedOwnedRecommendation
    );

    //Unexplored genre recommendation
    const unexploredOwnedMap = new Map<string, number>();

    unplayedGamesData.forEach((game) => {
        const gameTags = Object.keys(game.tags);

        const matchingFavoriteGenres = gameTags.filter((tag) =>
            favoriteGenres.some(([genre]) => genre === tag)
        ).length;

        const matchingUnexploredGenres = gameTags.filter((tag) =>
            unexploredGenres.some((genre) => genre === tag)
        ).length;

        const matchingGameplay = gameTags.filter((tag) =>
            favoriteGameplay.some(([gp]) => gp === tag)
        ).length;

        const matchingThemes = gameTags.filter((tag) =>
            favoriteThemes.some(([theme]) => theme === tag)
        ).length;

        const matchingMoods = gameTags.filter((tag) =>
            favoriteMoods.some(([mood]) => mood === tag)
        ).length;

        const hasDislikedGenre =
            gameTags.filter((tag) =>
                dislikedGenres.some((genre) => genre === tag)
            ).length > 0;

        const nonGenreMatchingTags =
            matchingGameplay + matchingThemes + matchingMoods;

        const matchingTags = matchingUnexploredGenres + nonGenreMatchingTags;

        if (
            matchingUnexploredGenres > 0 &&
            matchingFavoriteGenres === 0 &&
            matchingGameplay > 0 &&
            nonGenreMatchingTags > 2 &&
            !hasDislikedGenre
        ) {
            unexploredOwnedMap.set(game.name, matchingTags);
        }
    });

    const unexploredOwnedRecommendation = [...unexploredOwnedMap.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([game]) => game);

    console.log(
        'Unexplored genre, already owned game recommendation:',
        unexploredOwnedRecommendation
    );

    return { unplayedOwnedRecommendation };
}
