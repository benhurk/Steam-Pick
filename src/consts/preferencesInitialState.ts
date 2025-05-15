import { TPreferences } from '@/types/TPreferences';

export const excludeByDefault = [21978, 113];

const preferencesInitialState: TPreferences = {
    exclude: excludeByDefault,
    include: [],
    popularity: '5000',
};

export default preferencesInitialState;
