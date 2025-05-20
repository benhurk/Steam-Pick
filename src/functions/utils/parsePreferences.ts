import { TPreferences } from '@/types/TPreferences';

export default function parsePreferences(
    popularity: string,
    minrelease: string,
    include?: string,
    exclude?: string
): TPreferences {
    const includePref = include ? JSON.parse(decodeURIComponent(include)) : [];
    const excludePref = exclude ? JSON.parse(decodeURIComponent(exclude)) : [];

    return {
        exclude: excludePref,
        include: includePref,
        popularity: Number(popularity),
        minReleaseYear: Number(minrelease),
    };
}
