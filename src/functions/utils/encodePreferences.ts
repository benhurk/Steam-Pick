/* eslint-disable @typescript-eslint/no-unused-vars */
import { TPreferences } from '@/types/TPreferences';

export default function encodePreferences(preferences: TPreferences) {
    // Filter out false values and empty arrays
    const filtered = Object.fromEntries(
        Object.entries(preferences).filter(
            ([_, value]) => value && value.length > 0
        )
    );

    // Return empty string if no valid values exist
    if (Object.keys(filtered).length === 0) {
        return '';
    }

    return encodeURIComponent(JSON.stringify(filtered));
}
