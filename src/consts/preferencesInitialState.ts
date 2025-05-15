import { TPreferences } from '@/types/TPreferences';

export const excludeByDefault = [21978];

const preferencesInitialState: TPreferences = {
    exclude: [],
    include: [],
    popularity: '5000',
};

export default preferencesInitialState;
