import { RiListSettingsFill } from 'react-icons/ri';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';

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
                <DialogTitle>Preferences</DialogTitle>
            </DialogContent>
        </Dialog>
    );
}
