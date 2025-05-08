import { TPreferences } from '@/types/TPreferences';

export default function recommendConditions(
    genresCount: number,
    gameplayCount: number,
    themesCount: number,
    moodsCount: number,
    preferences: TPreferences,
    hasPrefTags: boolean = true,
    hasExcludedTag: boolean = false
) {
    const nonGenreMatchingTags = gameplayCount + themesCount + moodsCount;

    if (preferences.include.length > 0) {
        if (
            genresCount > 0 &&
            gameplayCount > 0 &&
            !hasExcludedTag &&
            hasPrefTags
        ) {
            return true;
        } else return false;
    } else if (
        genresCount > 0 &&
        gameplayCount > 0 &&
        nonGenreMatchingTags > 2 &&
        !hasExcludedTag &&
        hasPrefTags
    ) {
        return true;
    } else return false;
}
