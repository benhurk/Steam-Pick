import { TPreferences } from '@/types/TPreferences';

export default function handleRecommendationsUrl(
    steamID: string,
    preferences: TPreferences
) {
    const includePref = encodeURIComponent(JSON.stringify(preferences.include));
    const excludePref = encodeURIComponent(JSON.stringify(preferences.exclude));

    return `/recommendations?steamId=${steamID}&popularity=${
        preferences.popularity
    }&minrelease=${preferences.minReleaseYear}${
        preferences.include.length > 0 ? `&include=${includePref}` : ''
    }${preferences.exclude.length > 0 ? `&exclude=${excludePref}` : ''}`;
}
