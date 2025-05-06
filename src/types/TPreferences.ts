export interface TPreferences {
    exclude: number[];
    include: number[];
}

export interface TPreferencesContext {
    preferences: TPreferences;
    setPreferences: (newPref: TPreferences) => void;
}
