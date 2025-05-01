import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';

import { TfiHelpAlt } from 'react-icons/tfi';

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
                <DialogTitle>Help</DialogTitle>
                {
                    "Open Steam, on the top you'll see your profile click on it and then go to 'Account Details'"
                }
            </DialogContent>
        </Dialog>
    );
}
