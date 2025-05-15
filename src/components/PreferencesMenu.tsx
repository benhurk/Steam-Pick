import gameTags from '@/consts/gameTags';

import { RiListSettingsFill } from 'react-icons/ri';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import PopularitySlider from './PopularitySlider';
import CategorySwitch from './CategorySwitch';

export default function PreferencesMenu() {
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
                    <DialogTitle className='text-lg'>Preferences</DialogTitle>
                </DialogHeader>
                <div>
                    <section className='mb-6'>
                        <h3 className='font-semibold mb-2 text-lg'>
                            Popularity
                        </h3>
                        <DialogDescription className='text-md mb-4'>
                            Adjust the slider to set the <b>minimum</b>{' '}
                            popularity possible. How obscure recommended games{' '}
                            <b>can</b> be.
                        </DialogDescription>
                        <PopularitySlider />
                    </section>
                    <div className='flex flex-col gap-4'>
                        <div>
                            <h3 className='font-semibold mb-2 text-lg'>
                                Categories
                            </h3>
                            <DialogDescription className='text-md'>
                                Toggle the switches below to <b>only</b> include
                                games of that category.
                            </DialogDescription>
                        </div>
                        <section>
                            <h4 className='font-semibold mb-2'>
                                Miscellaneous
                            </h4>
                            <div className='grid grid-cols-2 gap-3'>
                                {gameTags.miscellaneous.map((t) => (
                                    <CategorySwitch
                                        key={t.tagid}
                                        tagid={t.tagid}
                                        tagname={t.name}
                                    />
                                ))}
                            </div>
                        </section>
                        <section>
                            <h4 className='font-semibold mb-2'>Difficulties</h4>
                            <div className='grid grid-cols-2 gap-3'>
                                {gameTags.difficulties.map((t) => (
                                    <CategorySwitch
                                        key={t.tagid}
                                        tagid={t.tagid}
                                        tagname={t.name}
                                    />
                                ))}
                            </div>
                        </section>
                        <section>
                            <h4 className='font-semibold mb-2'>Pacing</h4>
                            <div className='grid grid-cols-2 gap-3'>
                                {gameTags.pacings.map((t) => (
                                    <CategorySwitch
                                        key={t.tagid}
                                        tagid={t.tagid}
                                        tagname={t.name}
                                    />
                                ))}
                            </div>
                        </section>
                        <section>
                            <h4 className='font-semibold mb-2'>Multiplayer</h4>
                            <div className='grid grid-cols-2 gap-3'>
                                {gameTags.multiplayer.map((t) => (
                                    <CategorySwitch
                                        key={t.tagid}
                                        tagid={t.tagid}
                                        tagname={t.name}
                                    />
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
