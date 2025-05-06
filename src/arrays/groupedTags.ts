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
];
