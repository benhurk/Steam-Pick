import { usePreferences } from '@/contexts/Preferences';

import preferencesInitialState from '@/consts/preferencesInitialState';

import { Slider } from './ui/slider';

export default function PopularitySlider() {
    const { preferences, setPreferences } = usePreferences();

    return (
        <div className='flex items-center gap-2'>
            <span className='text-sm'>Popular</span>
            <Slider
                min={1000}
                max={10000}
                step={1000}
                value={[Number(preferences.popularity)]}
                defaultValue={[Number(preferencesInitialState.popularity)]}
                onValueChange={(e) =>
                    setPreferences({
                        ...preferences,
                        popularity: String(e[0]),
                    })
                }
            />
            <span className='text-sm'>Obscure</span>
        </div>
    );
}
