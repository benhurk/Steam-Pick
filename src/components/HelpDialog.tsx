import Link from 'next/link';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';

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
                <DialogHeader className='border-b border-gray-300 pb-3'>
                    <DialogTitle>Help</DialogTitle>
                </DialogHeader>
                <div className='flex flex-col gap-8'>
                    <section>
                        <h4 className='font-semibold'>What is a SteamID?</h4>
                        <p>
                            A SteamID is a unique identifier used to identify a
                            Steam account, it is a 17 digit number in this
                            format: 76561198#########.
                        </p>
                    </section>
                    <section>
                        <h4 className='font-semibold'>
                            How do i get my SteamID?
                        </h4>
                        <p className='mb-1'>Either:</p>
                        <ul className='list-disc pl-4 flex flex-col gap-1'>
                            <li>
                                Open Steam and go to <b>Account details</b>.
                            </li>
                            <li>
                                Use a tool like{' '}
                                <a
                                    href='https://steamdb.info/calculator/'
                                    target='_blank'
                                    className='font-bold text-sky-700 underline'>
                                    Steam Calculator
                                </a>
                                .
                            </li>
                            <li>
                                {`
                                If you've never set a custom Steam Community URL for
                                your account, your ID will will be shown in
                                your profile URL. 
                            `}
                            </li>
                        </ul>
                    </section>
                    <section>
                        <h4 className='font-semibold'>
                            How do i make my profile publicly visible?
                        </h4>
                        <ol className='list-decimal pl-4 flex flex-col gap-1'>
                            <li>
                                From your Steam Profile, click the Edit Profile
                                link under your displayed badge.
                            </li>
                            <li>Click the Privacy Settings tab.</li>
                            <li>
                                Select your privacy state (any settings changed
                                are saved automatically).
                            </li>
                        </ol>
                    </section>
                    <p className='font-semibold'>
                        For more information check the{' '}
                        <Link href='/about' className='underline text-sky-700'>
                            about page
                        </Link>
                        .
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
