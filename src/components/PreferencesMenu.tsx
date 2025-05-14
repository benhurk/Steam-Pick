import { RiListSettingsFill } from 'react-icons/ri';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { Switch } from '@/components/ui/switch';
import gameTags from '@/consts/gameTags';
import { usePreferences } from '@/contexts/Preferences';
import { excludeByDefault } from '@/consts/preferencesInitialState';

export default function PreferencesMenu() {
    const { preferences, setPreferences } = usePreferences();

    const toggleTag = (tagid: number) => {
        if (preferences.include.includes(tagid)) {
            if (excludeByDefault.includes(tagid)) {
                setPreferences({
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
        <Dialog>
            <DialogTrigger
                className='flex items-center gap-1 cursor-pointer w-fit text-slate-900 bg-slate-200 py-1.5 px-4 rounded-md 
                hover:bg-white hover:text-slate-700
                transition-colors duration-300 ease-in-out'>
                <RiListSettingsFill /> Preferences
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className='border-b border-gray-300 pb-3'>
                    <DialogTitle>Preferences</DialogTitle>
                </DialogHeader>
                <DialogDescription className='text-md'>
                    Toggle the switches below to <b>only</b> include games of
                    that category.
                </DialogDescription>
                <section className='mb-6'>
                    <h3 className='font-semibold mb-2'>Miscellaneous</h3>
                    <div className='grid grid-cols-2 gap-3'>
                        {gameTags.miscellaneous.map((t) => (
                            <div
                                key={t.tagid}
                                className='flex items-center gap-2 text-sm'>
                                <Switch
                                    id={t.name}
                                    checked={preferences.include.some(
                                        (m) => m === t.tagid
                                    )}
                                    onClick={() => toggleTag(t.tagid)}
                                />
                                <label htmlFor={t.name}>{t.name}</label>
                            </div>
                        ))}
                    </div>
                </section>
                <section className='mb-6'>
                    <h3 className='font-semibold mb-2'>Difficulties</h3>
                    <div className='grid grid-cols-2 gap-3'>
                        {gameTags.difficulties.map((d) => (
                            <div
                                key={d.tagid}
                                className='flex items-center gap-2 text-sm'>
                                <Switch
                                    id={d.name}
                                    checked={preferences.include.some(
                                        (m) => m === d.tagid
                                    )}
                                    onClick={() => toggleTag(d.tagid)}
                                />
                                <label htmlFor={d.name}>{d.name}</label>
                            </div>
                        ))}
                    </div>
                </section>
                <section className='mb-6'>
                    <h3 className='font-semibold mb-2'>Pacing</h3>
                    <div className='grid grid-cols-2 gap-3'>
                        {gameTags.pacings.map((p) => (
                            <div
                                key={p.tagid}
                                className='flex items-center gap-2 text-sm'>
                                <Switch
                                    id={p.name}
                                    checked={preferences.include.some(
                                        (m) => m === p.tagid
                                    )}
                                    onClick={() => toggleTag(p.tagid)}
                                />
                                <label htmlFor={p.name}>{p.name}</label>
                            </div>
                        ))}
                    </div>
                </section>
                <section>
                    <h3 className='font-semibold mb-2'>Multiplayer</h3>
                    <div className='grid grid-cols-2 gap-3'>
                        {gameTags.multiplayer.map((mp) => (
                            <div
                                key={mp.tagid}
                                className='flex items-center gap-2 text-sm'>
                                <Switch
                                    id={mp.name}
                                    checked={preferences.include.some(
                                        (m) => m === mp.tagid
                                    )}
                                    onClick={() => toggleTag(mp.tagid)}
                                />
                                <label htmlFor={mp.name}>{mp.name}</label>
                            </div>
                        ))}
                    </div>
                </section>
            </DialogContent>
        </Dialog>
    );
}
