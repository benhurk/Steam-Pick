export interface TPreferences {
    exclude: number[];
    include: number[];
    popularity: string;
}

export interface TPreferencesContext {
    preferences: TPreferences;
    setPreferences: (newPref: TPreferences) => void;
}
