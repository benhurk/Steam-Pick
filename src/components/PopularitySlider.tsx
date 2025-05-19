import { usePreferences } from '@/contexts/Preferences';

import preferencesInitialState from '@/consts/preferencesInitialState';

import { Slider } from './ui/slider';

export default function PopularitySlider() {
    const { preferences, setPreferences } = usePreferences();

    return (
        <div className='flex items-center gap-2'>
            <span className='text-sm'>Obscure</span>
            <Slider
                min={500}
                max={6500}
                step={500}
                value={[preferences.popularity]}
                defaultValue={[preferencesInitialState.popularity]}
                onValueChange={(e) =>
                    setPreferences({
                        ...preferences,
                        popularity: e[0],
                    })
                }
            />
            <span className='text-sm'>Popular</span>
        </div>
    );
}
