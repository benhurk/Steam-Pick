import { SteamGame } from '@/types/SteamGame';
import SteamSpyDataRes from '@/types/SteamSpyDataRes';
import pLimit from 'p-limit';
import getSteamSpyAppDetails from './helpers/getSteamSpyAppDetails';
import getMatchingTags from './helpers/getMatchingTags';
import recommendConditions from './utils/recommendConditions';

const limit = pLimit(1);

export default async function getNewRecommendations(
    favoriteGenres: [string, number][],
    favoriteGameplay: [string, number][],
    favoriteThemes: [string, number][],
    favoriteMoods: [string, number][],
    dislikedGenres: string[],
    ownedGames: SteamGame[]
) {
    //Similar
    const tagRequests = favoriteGenres.map(([genre]) =>
        limit(async () => {
            const response = await fetch(
                `https://steamspy.com/api.php?request=tag&tag=${genre}`,
                { next: { revalidate: 86400 } }
            );
            const data = await response.json();

            if (
                typeof data === 'object' &&
                data !== null &&
                !Array.isArray(data)
            ) {
                return Object.values(data) as Omit<
                    SteamSpyDataRes,
                    'tags' | 'genre' | 'languages'
                >;
            } else {
                throw new Error('Unexpected API response format');
            }
        })
    );

    const favoriteGenresGames = (await Promise.all(tagRequests)).flat();

    const relevantGames = favoriteGenresGames.filter(
        (game) =>
            game.positive + game.negative > 10000 &&
            game.positive / (game.positive + game.negative) >= 0.8 &&
            !ownedGames.some((og) => og.name === game.name.toLowerCase())
    );

    const relevantGamesData = await getSteamSpyAppDetails(
        relevantGames.map((game) => game.appid)
    );

    const recommendations = relevantGamesData
        .map((game) => {
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
                matchingGameplay.count +
                matchingThemes.count +
                matchingMoods.count;

            const matchingTags = matchingGenres.count + nonGenreMatchingTags;

            if (
                recommendConditions(
                    matchingGenres.count,
                    matchingGameplay.count,
                    nonGenreMatchingTags,
                    hasDislikedGenre,
                    matchingGenres.tags
                )
            ) {
                return {
                    name: game.name,
                    id: game.appid,
                    matchingTags: {
                        count: matchingTags,
                        tags: [
                            ...matchingGenres.tags,
                            ...matchingGameplay.tags,
                            ...matchingThemes.tags,
                            ...matchingMoods.tags,
                        ],
                    },
                };
            }
        })
        .filter((r) => r != undefined)
        .sort((a, b) => b.matchingTags.count - a.matchingTags.count);

    console.log('New games recommendations:', recommendations);

    return recommendations;
}
