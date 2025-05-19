export interface TPreferences {
    exclude: number[];
    include: number[];
    popularity: number;
    minReleaseYear: number;
}

export interface TPreferencesContext {
    preferences: TPreferences;
    setPreferences: (newPref: TPreferences) => void;
}
