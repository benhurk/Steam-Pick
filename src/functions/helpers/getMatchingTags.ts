export default function getMatchingTags(
    gameTags: number[],
    favoriteGenres: [number, number][],
    favoriteGameplay: [number, number][],
    favoriteThemes: [number, number][]
) {
    const matchingGenresTags = gameTags.filter((tag) =>
        favoriteGenres.some(([genre]) => genre === tag)
    );

    const matchingGenres = {
        count: matchingGenresTags.length,
        tags: matchingGenresTags,
    };

    const matchingGameplayTags = gameTags.filter((tag) =>
        favoriteGameplay.some(([gp]) => gp === tag)
    );

    const matchingGameplay = {
        count: matchingGameplayTags.length,
        tags: matchingGameplayTags,
    };

    const matchingThemesTags = gameTags.filter((tag) =>
        favoriteThemes.some(([theme]) => theme === tag)
    );

    const matchingThemes = {
        count: matchingThemesTags.length,
        tags: matchingThemesTags,
    };

    return {
        matchingGenres,
        matchingGameplay,
        matchingThemes,
    };
}
