import { TPreferences } from '@/types/TPreferences';

export const excludeByDefault = [21978, 113];

const preferencesInitialState: TPreferences = {
    exclude: excludeByDefault,
    include: [],
};

export default preferencesInitialState;
