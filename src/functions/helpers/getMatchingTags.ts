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

    const matchingGameplay = gameTags.filter((tag) =>
        favoriteGameplay.some(([gp]) => gp === tag)
    ).length;

    const matchingThemes = gameTags.filter((tag) =>
        favoriteThemes.some(([theme]) => theme === tag)
    ).length;

    const matchingMoods = gameTags.filter((tag) =>
        favoriteMoods.some(([mood]) => mood === tag)
    ).length;

    return { matchingGenres, matchingGameplay, matchingThemes, matchingMoods };
}
