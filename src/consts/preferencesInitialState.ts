import { TPreferences } from '@/types/TPreferences';

export const excludeByDefault = [21978];

const preferencesInitialState: TPreferences = {
    exclude: [],
    include: [],
    popularity: 2500,
    minReleaseYear: 2010,
};

export default preferencesInitialState;
