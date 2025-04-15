import SteamSpyDataRes from '@/types/SteamSpyDataRes';
import getMatchingTags from './helpers/getMatchingTags';
import recommendConditions from './utils/recommendConditions';
import { RecommendationsArray } from '@/types/Recommendations';

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
    const unplayed: RecommendationsArray = [];

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
            matchingGameplay.count + matchingThemes.count + matchingMoods.count;

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
            unplayed.push({
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
            });
        }
    });

    unplayed.sort((a, b) => b.matchingTags.count - a.matchingTags.count);

    console.log('Already owned game recommendation:', unplayed);

    //Unexplored genre recommendation
    const unexplored: RecommendationsArray = [];

    unplayedGamesData.forEach((game) => {
        const gameTags = Object.keys(game.tags);

        const matchingUnexploredGenresTags = gameTags.filter((tag) =>
            unexploredGenres.some((genre) => genre === tag)
        );

        const matchingUnexploredGenres = {
            count: matchingUnexploredGenresTags.length,
            tags: matchingUnexploredGenresTags,
        };

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
            matchingGameplay.count + matchingThemes.count + matchingMoods.count;

        const matchingTags =
            matchingUnexploredGenres.count + nonGenreMatchingTags;

        if (
            matchingUnexploredGenres.count > 0 &&
            matchingGenres.count === 0 &&
            matchingGameplay.count > 1 &&
            nonGenreMatchingTags > 2 &&
            !hasDislikedGenre
        ) {
            unexplored.push({
                name: game.name,
                id: game.appid,
                matchingTags: {
                    count: matchingTags,
                    tags: [
                        ...matchingUnexploredGenres.tags,
                        ...matchingGameplay.tags,
                        ...matchingThemes.tags,
                        ...matchingMoods.tags,
                    ],
                },
            });
        }
    });

    unexplored.sort((a, b) => b.matchingTags.count - a.matchingTags.count);

    console.log(
        'Unexplored genre, already owned game recommendation:',
        unexplored
    );

    return { unplayed, unexplored };
}
