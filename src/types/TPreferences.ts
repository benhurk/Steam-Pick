export interface TPreferences {
    earlyAccess: boolean;
    vr: boolean;
    mustInclude: number[];
}

export interface TPreferencesContext {
    preferences: TPreferences;
    setPreferences: (newPref: TPreferences) => void;
}
