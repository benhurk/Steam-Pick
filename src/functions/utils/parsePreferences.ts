import preferencesInitialState from '@/consts/preferencesInitialState';
import { TPreferences } from '@/types/TPreferences';

export default function parsePreferences(
    popularity?: string,
    minrelease?: string,
    include?: string,
    exclude?: string
): TPreferences {
    const includePref = include ? JSON.parse(decodeURIComponent(include)) : [];
    const excludePref = exclude ? JSON.parse(decodeURIComponent(exclude)) : [];
    const pop = popularity
        ? Number(popularity)
        : preferencesInitialState.popularity;
    const year = minrelease
        ? Number(minrelease)
        : preferencesInitialState.minReleaseYear;

    return {
        exclude: excludePref,
        include: includePref,
        popularity: Number(pop),
        minReleaseYear: Number(year),
    };
}
