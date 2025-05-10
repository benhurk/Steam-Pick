import {
    difficulties,
    miscellaneousTags,
    multiplayerTags,
} from '@/arrays/gamePreferences';
import { gameplayStyles, moods, themes } from '@/arrays/gameStyles';
import { broadGenres, specificGenres } from '@/arrays/genres';

export const allTags = [
    ...specificGenres,
    ...broadGenres,
    ...gameplayStyles,
    ...themes,
    ...moods,
    ...miscellaneousTags,
    ...difficulties,
    ...multiplayerTags,
];

export const groupedTags = [
    //Survival Horror, Psychological Horror
    new Set([3978, 1721]),
    //Metroidvania, Hack and Slash, Souls-like
    new Set([1628, 1646, 29482]),
    //Shmup, Souls-like
    new Set([4255, 29482]),
    //Precision Platformer, Souls-like
    new Set([3877, 29482]),
    // Retro, Old School, Arcade
    new Set([4004, 3916, 1773]),
    //Sports, Racing
    new Set([699, 701]),
    //Base building, City Builder
    new Set([4328, 7332]),
    //FPS, Shooter
    new Set([1663, 1774]),
    //Open World, Exploration
    new Set([1695, 3834]),
];
