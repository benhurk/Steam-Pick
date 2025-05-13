'use client';

import { TbFaceIdError } from 'react-icons/tb';
import { FaHome } from 'react-icons/fa';
import Link from 'next/link';

export default function NothingFoundCard() {
    return (
        <div>
            <div className='w-full h-52 text-white'>
                <TbFaceIdError className='size-full' />
            </div>
            <div className='px-3'>
                <p className='mb-6 text-xl text-center text-slate-200 leading-6'>
                    No games found, check your preferences settings and try
                    again.
                </p>
            </div>
            <Link
                href='/'
                className='flex w-56 mx-auto justify-center items-center gap-2 py-1 bg-slate-200 text-slate-950 font-semibold rounded-md cursor-pointer
                hover:bg-white transition-colors duration-200 ease-in-out'>
                <FaHome /> Try again
            </Link>
        </div>
    );
}
