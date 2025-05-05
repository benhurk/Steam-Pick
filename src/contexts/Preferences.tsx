'use client';

import { TPreferences, TPreferencesContext } from '@/types/TPreferences';
import { createContext, ReactNode, useContext, useState } from 'react';

const initialState: TPreferences = {
    earlyAccess: false,
    vr: false,
    mustInclude: [],
};

const PreferencesContext = createContext<TPreferencesContext>({
    preferences: initialState,
    setPreferences: () => {},
});

export function PreferencesProvider({ children }: { children: ReactNode }) {
    const [preferences, setPreferences] = useState<TPreferences>(initialState);

    const updatePreferences = (newPref: TPreferences) => {
        setPreferences((prev) => ({
            ...prev,
            ...newPref,
        }));
    };

    return (
        <PreferencesContext.Provider
            value={{
                preferences: preferences,
                setPreferences: updatePreferences,
            }}>
            {children}
        </PreferencesContext.Provider>
    );
}

export function usePreferences() {
    return useContext(PreferencesContext);
}
