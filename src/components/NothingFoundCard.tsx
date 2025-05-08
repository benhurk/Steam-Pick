'use client';

import { TbFaceIdError } from 'react-icons/tb';

export default function NothingFoundCard() {
    return (
        <div
            className='relative h-[32rem] w-80 border border-slate-300 rounded-sm overflow-hidden shadow-lg shadow-sky-800
                        bg-gradient-to-bl from-slate-950 via-slate-800 to-slate-950 
                        hover:scale-105 hover:from-slate-900 hover:via-slate-700 hover:to-slate-900 hover:shadow-sky-700
                        transition duration-200 ease-in-out'>
            <div className='h-full flex flex-col justify-between'>
                <div className='h-full flex flex-col justify-center'>
                    <div className='w-full h-52 text-white'>
                        <TbFaceIdError className='size-full' />
                    </div>
                    <div className='px-3'>
                        <p className='text-lg text-center text-slate-200 leading-6'>
                            No games found, check your preferences settings and
                            try again.
                        </p>
                    </div>
                </div>
                <div className='p-3 pt-0'>
                    <button
                        type='button'
                        onClick={() => {}}
                        className='w-full py-1 bg-slate-200 text-slate-950 font-semibold rounded-md cursor-pointer
                                                    hover:bg-white transition-colors duration-200 ease-in-out'>
                        Try again
                    </button>
                </div>
            </div>
        </div>
    );
}
