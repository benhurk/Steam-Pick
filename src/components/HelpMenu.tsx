import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';

import { TfiHelpAlt } from 'react-icons/tfi';
import { RiListSettingsFill } from 'react-icons/ri';

export default function HelpMenu() {
    return (
        <Dialog>
            <DialogTrigger
                className='flex items-center gap-1 cursor-pointer w-fit text-blue-300 bg-transparent py-1.5 px-4 rounded-md 
                        border border-blue-300 hover:bg-blue-300 hover:text-slate-900
                        transition-colors duration-300 ease-in-out'>
                <TfiHelpAlt /> Help
            </DialogTrigger>
            <DialogContent>
                <DialogTitle className='border-b border-gray-300 pb-3'>
                    Help
                </DialogTitle>
                <section>
                    <h3 className='font-semibold'>How do i get my Steam ID?</h3>
                    Open Steam and go to your Account details.
                </section>
                <section>
                    <h3 className='font-semibold'>
                        Is my Steam ID confidential?
                    </h3>
                    No, you might even have it in your profile URL and anyone
                    can see it.
                </section>
                <section>
                    <h3 className='font-semibold'>How do i use this tool?</h3>
                    Just submit your Steam ID and everything will happen
                    automatically. If you want, you can customize your results
                    in the{' '}
                    <span className='bg-gray-200 px-2 py-1 rounded-sm'>
                        <RiListSettingsFill className='inline-block' />{' '}
                        Preferences
                    </span>{' '}
                    menu.
                </section>
            </DialogContent>
        </Dialog>
    );
}
