export default function getMatchingTags(
    gameTags: string[],
    favoriteGenres: [string, number][],
    favoriteGameplay: [string, number][],
    favoriteThemes: [string, number][],
    favoriteMoods: [string, number][]
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

    const matchingMoodsTags = gameTags.filter((tag) =>
        favoriteMoods.some(([mood]) => mood === tag)
    );

    const matchingMoods = {
        count: matchingMoodsTags.length,
        tags: matchingMoodsTags,
    };

    return { matchingGenres, matchingGameplay, matchingThemes, matchingMoods };
}
