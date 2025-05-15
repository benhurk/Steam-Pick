import { usePreferences } from '@/contexts/Preferences';
import { Switch } from './ui/switch';
import { excludeByDefault } from '@/consts/preferencesInitialState';

type Props = {
    tagid: number;
    tagname: string;
};

export default function CategorySwitch({ tagid, tagname }: Props) {
    const { preferences, setPreferences } = usePreferences();

    const toggleTag = (tagid: number) => {
        if (preferences.include.includes(tagid)) {
            if (excludeByDefault.includes(tagid)) {
                setPreferences({
                    ...preferences,
                    include: preferences.include.filter((t) => t != tagid),
                    exclude: [...preferences.exclude, tagid],
                });
            } else {
                setPreferences({
                    ...preferences,
                    include: preferences.include.filter((t) => t != tagid),
                });
            }
        } else {
            if (excludeByDefault.includes(tagid)) {
                setPreferences({
                    ...preferences,
                    include: [...preferences.include, tagid],
                    exclude: preferences.exclude.filter((t) => t != tagid),
                });
            } else {
                setPreferences({
                    ...preferences,
                    include: [...preferences.include, tagid],
                });
            }
        }
    };

    return (
        <div className='flex items-center gap-2 text-sm'>
            <Switch
                id={tagname}
                checked={preferences.include.includes(tagid)}
                onClick={() => toggleTag(tagid)}
            />
            <label htmlFor={tagname}>{tagname}</label>
        </div>
    );
}
