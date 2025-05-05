import { RiListSettingsFill } from 'react-icons/ri';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { Switch } from '@/components/ui/switch';
import { difficulties, multiplayerTags } from '@/arrays/gamePreferences';
import { usePreferences } from '@/contexts/Preferences';

export default function PreferencesMenu() {
    const { preferences, setPreferences } = usePreferences();

    const toggleTag = (tagid: number) => {
        if (preferences.mustInclude.some((tag) => tag === tagid)) {
            return preferences.mustInclude.filter((t) => t != tagid);
        } else {
            return [...preferences.mustInclude, tagid];
        }
    };

    const handleToggleTag = (tagid: number) => {
        setPreferences({
            ...preferences,
            mustInclude: toggleTag(tagid),
        });
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
                <section className='mb-6'>
                    <h3 className='font-semibold mb-2'>Miscellaneous</h3>
                    <div className='grid grid-cols-2 gap-3 text-sm'>
                        <div className='flex items-center gap-2'>
                            <Switch
                                id='earlyAccess'
                                checked={preferences.earlyAccess}
                                onClick={() =>
                                    setPreferences({
                                        ...preferences,
                                        earlyAccess: !preferences.earlyAccess,
                                    })
                                }
                            />
                            <label htmlFor='earlyAccess'>Early Access</label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Switch
                                id='VR'
                                checked={preferences.vr}
                                onClick={() =>
                                    setPreferences({
                                        ...preferences,
                                        vr: !preferences.vr,
                                    })
                                }
                            />
                            <label htmlFor='VR'>VR</label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Switch
                                id='familyFriendly'
                                checked={preferences.mustInclude.some(
                                    (m) => m === 5350
                                )}
                                onClick={() => handleToggleTag(5350)}
                            />
                            <label htmlFor='familyFriendly'>
                                Family Friendly
                            </label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Switch
                                id='f2p'
                                checked={preferences.mustInclude.some(
                                    (m) => m === 113
                                )}
                                onClick={() => handleToggleTag(113)}
                            />
                            <label htmlFor='f2p'>Free to Play</label>
                        </div>
                    </div>
                </section>
                <section className='mb-6'>
                    <h3 className='font-semibold mb-2'>Difficulties</h3>
                    <div className='grid grid-cols-2 gap-3'>
                        {difficulties.map((d) => (
                            <div
                                key={d.tagid}
                                className='flex items-center gap-2 text-sm'>
                                <Switch
                                    id={d.name}
                                    checked={preferences.mustInclude.some(
                                        (m) => m === d.tagid
                                    )}
                                    onClick={() => handleToggleTag(d.tagid)}
                                />
                                <label htmlFor={d.name}>{d.name}</label>
                            </div>
                        ))}
                    </div>
                </section>
                <section>
                    <h3 className='font-semibold mb-2'>Multiplayer</h3>
                    <div className='grid grid-cols-2 gap-3'>
                        {multiplayerTags.map((mp) => (
                            <div
                                key={mp.tagid}
                                className='flex items-center gap-2 text-sm'>
                                <Switch
                                    id={mp.name}
                                    checked={preferences.mustInclude.some(
                                        (m) => m === mp.tagid
                                    )}
                                    onClick={() => handleToggleTag(mp.tagid)}
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
